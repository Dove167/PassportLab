import express from 'express';
import { ensureAdmin } from '../middleware/checkAuth';
import { userModel } from '../models/userModel';

const router = express.Router();

router.get('/', ensureAdmin, (req, res) => {
  console.log("Session store:", req.sessionStore);
  const sessionStore = req.sessionStore;

  if (!req.sessionStore || typeof sessionStore.all !== 'function') {
    return res.status(500).send('Session store is misconfigured or missing required methods.');
  }
  

  const sessions: Array<{
    sessionId: string;
    userId?: number | string;
    userName?: string;
    expires: string;
  }> = [];

  sessionStore.all((err, allSessions = {}) => {
    if (err) return res.status(500).send('Error retrieving sessions');

    if (!allSessions) {
      return res.status(500).send('No active sessions found.');
    }

    Object.entries(allSessions).forEach(([sessionId, sessionData]) => {
      const userId = sessionData.passport?.user;
      const user = userId ? userModel.findById(Number(userId)) : undefined;
      if (user) {
        sessions.push({
          sessionId,
          userId: user.id,
          userName: user.name,
          expires: sessionData.cookie.expires
            ? new Date(sessionData.cookie.expires).toLocaleString()
            : 'Active Session'
        });
      }
    });

    res.render('admin', { sessions });
  });
});

router.post('/revoke/:sessionId', ensureAdmin, (req, res) => {
  const { sessionId } = req.params;
  const sessionStore = req.sessionStore;

  if (!sessionStore || typeof sessionStore.destroy !== 'function') {
    return res.status(500).send('Session store is not configured correctly.');
  }

  sessionStore.destroy(sessionId, (err) => {
    if (err) {
      console.error('Error revoking session:', err);
      return res.redirect('/admin');
    }
    res.redirect('/admin');
  });
});

export default router;
