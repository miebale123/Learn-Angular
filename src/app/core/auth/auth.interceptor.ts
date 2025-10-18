import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken = localStorage.getItem('access-token');

  if (accessToken) {
    const cloned = req.clone({
      setHeaders: { Authorization: `Bearer ${accessToken}` },
    });
    return next(cloned);
  }

  return next(req);
};
