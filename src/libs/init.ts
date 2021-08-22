import Role from '../models/Role';

export const createRoles = async (): Promise<void> => {
    try {
        const count: number = await Role.estimatedDocumentCount();

        if(count > 0) return;

        await Promise.all([
            new Role({name: "user"}).save(),
            new Role({name: "moderator"}).save(),
            new Role({name: "admin"}).save(),
        ]);

        console.log(">> Roles created!");
    } catch (error) {
        console.log(">> Error on create roles!");
        console.log(error);
    }
}