import { Request, Response, NextFunction } from 'express';


const errorMiddleware = async (err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Erro interno no servidor' });
};

export default errorMiddleware;
