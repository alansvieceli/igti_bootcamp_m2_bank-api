import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;
const databaseAccounts = './data/accounts.json';
global.fileName = databaseAccounts;
const initialJson = {
  nextId: 1,
  accounts: [],
};

const saveAccounts = async value => {
  await writeFile(databaseAccounts, JSON.stringify(value, null, 2));
};

const readAccounts = async () => {
  return JSON.parse(await readFile(databaseAccounts));
};

const createDatabase = async () => {
  try {
    await saveAccounts(initialJson);
  } catch (err) {
    console.log('**** ERRO AO INICIAR DATABASE ****');
  }
};

export const initDatabase = async () => {
  try {
    await readAccounts();
  } catch (err) {
    await createDatabase();
  }
};

export const insertAccount = async value => {
  try {
    const data = await readAccounts();
    const newData = {
      id: data.nextId++, //usar e depois incrementar
      ...value,
    };
    data.accounts.push(newData);
    await saveAccounts(data);
    return newData;
  } catch (err) {
    return { error: err.message };
  }
};

export const selectAccount = async () => {
  try {
    const data = await readAccounts();
    delete data.nextId;
    return data;
  } catch (err) {
    return { error: err.message };
  }
};

export const selectAccountById = async id => {
  try {
    const data = await selectAccount();
    return data.accounts.find(a => a.id === parseInt(id));
  } catch (err) {
    return { error: err.message };
  }
};

export const deleteAccount = async id => {
  try {
    const data = await readAccounts();
    data.accounts = data.accounts.filter(a => a.id !== parseInt(id));
    await saveAccounts(data);
    return true;
  } catch (err) {
    return { error: err.message };
  }
};

export const updateAccount = async value => {
  try {
    const data = await readAccounts();
    const index = data.accounts.findIndex(a => a.id === parseInt(value.id));
    data.accounts[index] = value;
    await saveAccounts(data);
    return value;
  } catch (err) {
    return { error: err.message };
  }
};
