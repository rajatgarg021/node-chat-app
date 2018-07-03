const expect = require("expect");

const { Users } = require("./users");

describe("Users", () => {
    var userss;

    beforeEach(()=>{
        userss = new Users();
        userss.users = [{
            id: "1",
            name: "rajat",
            room: "node"
        }, 
        {
            id: "2",
            name: "garg",
            room: "react"
        }, 
        {
            id: "3",
            name: "snake_eye021.",
            room: "node"
        }]
    });





    it("should add new Users", () => {
        var users = new Users();
        var user = {
            id: "123",
            name: "Rajat garg",
            room: "bhen chod mera room hai"
        };
        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    })
     
    it("should remove a user", ()=>{
        var userId = '2';
        var usersList = userss.removeUser(userId);
        expect(usersList.id).toBe(userId);
        expect(userss.users.length).toBe(2);
    })
    it("should not remove a user", ()=>{
        var userId = '12345';
        var usersList = userss.removeUser(userId);
        expect(usersList).toBeFalsy();
        expect(userss.users.length).toBe(3);
    })
    it("should find user", ()=>{
        var userId = '2';
        var user = userss.getUser(userId);
        expect(user.id).toBe(userId);

    })
    it("should not find a user", ()=>{
        var userId = "100"
        var user = userss.getUser(userId);
        
        expect(user).toBeFalsy();
    })
    it("should return names for node room", ()=>{
        var usersList = userss.getUsersList("node");
        expect(usersList).toEqual(['rajat', 'snake_eye021.'])
    })

    it("should return names for react room", () => {
        var usersList = userss.getUsersList("react");
        expect(usersList).toEqual(['garg'])
    })

})