import { dbCreate, dbRead, dbUpdate } from './dbService';

async function checkIfUserRegisterAsync(uid) {
    const res = await dbRead(`/users/${uid}`);
    const val = res.val();

    return !!val;
}

function registerNewUserAsync(uid, data) {
    const patch = {
        ...data,
        regAt: new Date().toISOString(),
        lastVisitAt: new Date().toISOString()
    };

    return dbCreate(`/users/${uid}`, patch)
}

function updateUserAsync(uid, data = {}) {
    const changes = {
        lastVisitAt: new Date().toISOString(),
        ...data
    };

    const patch = Object.entries(changes)
        .reduce((acc , [key, val]) => ({ ...acc, [`/users/${uid}/${key}`]: val }), {})

    return dbUpdate(patch);
}

export async function loginUserHandlerAsync(uid, data){
    const isAlready = await checkIfUserRegisterAsync(uid);
    if(isAlready) {
        return updateUserAsync(uid);
    } else {
        return registerNewUserAsync(uid, data);
    }
}
export async function getUsersListAsync() {
    const res = await dbRead('/users');
    const list = res.val();

    return list;
}
