let db;

export default class TodoService {

    constructor() {
        this.initializeDB();
    }

    initializeDB() {
        db = new Dexie('todoDB');
    
        db.version(1).stores({
            tasks: '++id,description'
        });
    
        db.on('populate', async () => {
            console.log('Should only see this once!');
            await db.tasks.bulkPut([
                { description: 'Learn JavaScript' },
                { description: 'Learn TypeScript' },
                { description: 'Learn PWA' },
                { description: 'Learn Java' },
            ]);
        });
    
    }

    getAll() {
        return db.tasks.toArray();
    }

    getById(id) {
        return db.tasks.get(id);
    }

    save(task) {
        return db.tasks.put(task);
    }

    delete(id) {
        return db.tasks.delete(id);
    }
    
}

/*async function list() {
    db.tasks.each(task => console.log(task));
    
    const taskTypeScript = await db.tasks.get(2);
    taskTypeScript.done = 1;
    db.tasks.put(taskTypeScript);

    const tasksDone = await db.tasks
    .where('description').equals('Learn Java').first();
    console.log('Query:', tasksDone);
}

list();*/

