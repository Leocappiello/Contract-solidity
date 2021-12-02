const TasksContract = artifacts.require("TasksContract")

contract("TasksContract", () => {


    before(async () => {
        this.tasksContract = await TasksContract.deployed()
    })

    it('migrate deployed successfully', async() => {
        const address = this.tasksContract.address
        
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
        assert.notEqual(address, 0x0)
        assert.notEqual(address, "")
    })

    it('get tasks list', async () => {
        const tasksCounter = await this.tasksContract.tasksCounter()
        const task = await this.tasksContract.tasks(tasksCounter)

        assert.equal(task.id.toNumber(), tasksCounter.toNumber());
        assert.equal(task.title, "my first task");
        assert.equal(task.description, "my first description");
        assert.equal(task.done, false);
        assert.equal(tasksCounter, 1);
    })

    it("task created successfully", async () => {
        const result = await this.tasksContract.createTask('some task', 'description two')
        const taskEvent =  result.logs[0].args;
        const tasksCounter = await this.tasksContract.tasksCounter()

        assert.equal(tasksCounter, 2)
        assert.equal(taskEvent.id.toNumber(), 2)
        assert.equal(taskEvent.title, 'some task')
        assert.equal(taskEvent.description, 'description two')
    })
})