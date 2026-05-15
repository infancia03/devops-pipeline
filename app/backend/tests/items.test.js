const request = require('supertest');
const app = require('../src/index');

// Mock the DB module so tests don't need a real database
jest.mock('../src/db', () => ({
  query: jest.fn(),
}));

const db = require('../src/db');

describe('Items API', () => {
  beforeEach(() => jest.clearAllMocks());

  it('GET /api/items returns list of items', async () => {
    db.query.mockResolvedValueOnce({
      rows: [{ id: '1', title: 'Test Item', description: 'Desc' }],
    });
    const res = await request(app).get('/api/items');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/items creates an item', async () => {
    db.query.mockResolvedValueOnce({
      rows: [{ id: '1', title: 'New Item', description: 'New' }],
    });
    const res = await request(app)
      .post('/api/items')
      .send({ title: 'New Item', description: 'New' });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('New Item');
  });

  it('POST /api/items without title returns 400', async () => {
    const res = await request(app).post('/api/items').send({});
    expect(res.statusCode).toBe(400);
  });

  it('GET /api/items/:id returns 404 when not found', async () => {
    db.query.mockResolvedValueOnce({ rows: [] });
    const res = await request(app).get('/api/items/nonexistent-id');
    expect(res.statusCode).toBe(404);
  });
});