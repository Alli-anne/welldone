import {getDb} from "../database/connect.js";

export async function getLists(req, res) {
    const db = await getDb();
    const lists = await db.collection('todo').find().toArray();
    res.json(lists);
    console.log(lists);

}

export async function createList(req, res) {
    const db = await getDb();
    const list = await db.collection('todo').insertOne(req.body);
    res.json(list);
    console.log(list);
}