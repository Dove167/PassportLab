/*
FIX ME (types) 😭
*/

import { Request, Response, NextFunction } from "express";

export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
}

export const forwardAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/dashboard");
}
  // export const ensureAuthenticated = (req: any, res: any, next: any) => {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect("/auth/login");
// }

/*
FIX ME (types) 😭
*/
// export const forwardAuthenticated = (req: any, res: any, next: any) => {
//     if (!req.isAuthenticated()) {
//       return next();
//     }
//     res.redirect("/dashboard");
// }