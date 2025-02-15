import express from 'express';
import { ensureAuthenticated } from '../middleware/checkAuth';
import { sessionStoreMethods } from '../app';

const router = express.Router();

router.get('/admin', ensureAuthenticated, (req, res) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).send('Forbidden');
  }

  sessionStoreMethods.getAllSessions((err, sessions) => {
    if (err) {
      console.error('Error fetching sessions:', err);
      return res.status(500).send('Internal Server Error');
    }

    const sessionList = (sessions || []).map((session: any) => ({
      id: session.id,
      user: session.passport?.user
    }));

    res.render('admin', {
      user: req.user,
      sessions: sessionList
    });
  });
});

router.post('/admin/revoke', ensureAuthenticated, (req, res) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).send('Forbidden');
  }

  const sessionId = req.body.sessionId;
  sessionStoreMethods.destroySession(sessionId, (err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.redirect('/admin');
  });
});

export default router;
