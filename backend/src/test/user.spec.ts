import supertest from 'supertest';
import app from '../index';

import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/UserController'

jest.mock('../src/controllers/UserController');

describe('Get users tests', () => {
  it(
    'should get users', async () => {
    const mockUsers = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }];

    (getAllUsers as jest.Mock).mockImplementation(async (req, res) => {
      res.status(200).json(mockUsers);
    });

    const response = await supertest(app).get('/api/users');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUsers);
  });

  it('should get user id 2', async () => {
    const mockUsers = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }];

    (getUserById as jest.Mock).mockImplementation(async (req, res) => {
      const userId = parseInt(req.params.id, 10);
      const user = mockUsers.find(u => u.id === userId);

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'Usuário não encontrado' });
      }
    });

    const response = await supertest(app).get('/api/users/2');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUsers[1]);
  });

  it('should get user id 3, but not exist', async () => {
    const mockUsers = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }];

    (getUserById as jest.Mock).mockImplementation(async (req, res) => {
      const userId = parseInt(req.params.id, 10);
      const user = mockUsers.find(u => u.id === userId);

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'Usuário não encontrado' });
      }
    });

    const response = await supertest(app).get('/api/users/3');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Usuário não encontrado' });
  });
});

describe('Create users tests', () => {
  it('should create a user', async () => {
    const mockUser = { id: 1, name: 'John Doe', email: 'john.doe@example.com' };
    (createUser as jest.Mock).mockImplementation(async (req, res) => {
      res.status(201).json(mockUser);
    });
  
    const response = await supertest(app).post('/api/users').send({ name: 'John Doe', email: 'john.doe@example.com' });
  
    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockUser);
  });
});

describe('Update users tests', () => {
  it('should update a user', async () => {
    const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
  
    (updateUser as jest.Mock).mockImplementation(async (req, res) => {
      const userId = parseInt(req.params.id, 10);
      const { name, email } = req.body;
  
      const updatedUser = { ...mockUser, name, email };
  
      res.status(200).json(updatedUser);
    });
  
    const response = await supertest(app).put('/api/users/1').send({ name: 'John', email: 'john@example.com' });
  
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, name: 'John', email: 'john@example.com' });
  });
});