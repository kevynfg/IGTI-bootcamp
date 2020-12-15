import { db } from '../models/index.js';

const Account = db.account;

const deposit = async (req, res) => {
  const account = req.body;

  try {
    let newDeposit = await validateAccount(account);

    newDeposit.balance += account.balance;
    newDeposit = new Account(newDeposit);
    await newDeposit.save();

    res.send(newDeposit);
  } catch (error) {
    res.status(500).send('Error ao depositar', error);
  }
};

const withdraw = async (req, res) => {
  const account = req.body;

  try {
    let newDrawMoney = await validateAccount(account);
    newDrawMoney.balance -= account.balance + 1; //+1 é a taxa de saque
    if (newDrawMoney.balance < 0) {
      throw new Error('Saldo Insuficiente.');
    }
    newDrawMoney = new Account(newDrawMoney);
    await newDrawMoney.save();
  } catch (error) {
    res.status(500).send('Error ao sacar', error);
  }
};

const checkBalance = async (req, res) => {
  const agencia = req.params.agencia;
  const conta = req.params.conta;

  try {
    const checkBalance = await validateAccount({ agencia, conta });
    res.send(checkBalance);
  } catch (error) {
    res.status(500).send('Error ao consultar', error);
  }
};

const remove = async (req, res) => {
  const account = req.body;
  try {
    let deleteAccount = await validateAccount(account);
    await Account.findByIdAndRemove({ _id: deleteAccount._id });

    //Após a exclusão, usar o id da agência para buscar quantas
    //continuam existindo no banco
    deleteAccount = await Account.find({
      agencia: deleteAccount.agencia,
    }).countDocuments();
    res.send({ TotalAccounts: deleteAccount });
  } catch (error) {
    res.status(500).send('Error ao remover conta', error);
  }
};

const transfer = async (req, res) => {
  const account = req.body;
  const transferMoney = account.valor;

  try {
    let sourceAccount = await validateAccount({ conta: account.contaOrigem });
    let targetAccount = await validateAccount({ conta: account.contaDestino });

    //cobra uma taxa se a agencia de uma conta não for igual a outra
    if (sourceAccount.agencia !== targetAccount.agencia) {
      sourceAccount.balance -= 8;
    }
    sourceAccount.balance -= transferMoney;

    if (sourceAccount.balance < 0) {
      throw new Error('Saldo insuficiente para efetuar a operação', error);
    }
    targetAccount.balance += transferMoney;

    sourceAccount = new Account(sourceAccount);
    await sourceAccount.save();
    targetAccount = new Account(targetAccount);
    await targetAccount.save();

    res.send(sourceAccount);
  } catch (error) {
    res.status(500).send('Error ao transferir o dinheiro', error);
  }
};

const avgBalance = async (req, res) => {
  const agencia = req.params.agencia;
  try {
    const averageBalance = await Account.aggregate([
      {
        $match: {
          agencia: parseInt(agencia),
        },
      },
      {
        $group: {
          _id: '$agencia',
          media: {
            $avg: '$balance',
          },
        },
      },
      {
        $project: {
          _id: 0,
          media: 1,
        },
      },
    ]);

    if (averageBalance.length === 0) {
      throw new Error('Agencia não encontrada');
    }
    res.send(averageBalance);
  } catch (error) {
    res.status(500).send('Error ao buscar média', error);
  }
};

const topByBalanceLowest = async (req, res) => {
  const limit = req.params.limit;

  try {
    const account = await Account.find(
      //busca por todas as ocorrências
      {},
      //define a projeção da busca
      { _id: 0, agencia: 1, conta: 1, balance: 1 }
    )
      .limit(parseInt(limit))
      .sort({ saldo: 1 });
    if (account.length === 0) {
      throw new Error('Nenhum cliente encontrado');
    }
    res.send(account);
  } catch (error) {
    res.status(500).send('Error ao o saldo', error);
  }
};

const topByBalanceHeighest = async (req, res) => {
  const limit = req.params.limit;

  try {
    const account = await Account.find(
      //busca por todas as ocorrências
      {},
      //define a projeção da busca
      { _id: 0, agencia: 1, conta: 1, balance: 1 }
    )
      .limit(parseInt(limit))
      //o sort de saldo -1 é decrescente e nome do cliente crescente
      .sort({ saldo: -1, nome: 1 });
    if (account.length === 0) {
      throw new Error('Nenhum cliente encontrado');
    }
    res.send(account);
  } catch (error) {
    res.status(500).send('Error ao o saldo', error);
  }
};

const transferToPrivate = async (req, res) => {
  try {
    //Busca pela agencia privada e balance
    let transferToPrivates = await Account.aggregate([
      {
        $group: {
          _id: '$agencia',
          balance: { $max: '$balance' },
        },
      },
    ]);
    //para cada conta da busca, destrutura ela, altera a agencia e salva
    for (const transferToPrivate of transferToPrivates) {
      const { _id, balance } = transferToPrivate;
      let newAccount = await Account.findOne({
        agencia: _id,
        balance,
      });
      newAccount.agencia = 99;
      newAccount.save();
    }
    transferToPrivates = await Account.find({
      agencia: 99,
    });
    res.send(transferToPrivates);
  } catch (error) {
    res.status(500).send('Error ao transferir', error);
  }
};

//função para validar existência de contas
const validateAccount = async (account) => {
  const { conta, agencia } = account;

  account = {
    conta,
    agencia,
  };
  try {
    if (typeof account.agencia !== 'undefined') {
      account = await Account.findOne(account);
    } else {
      account = await Account.findOne({ conta: account.conta });
    }
    if (!account) {
      throw new Error(`(${agencia}/${conta}) agencia/conta invalida`);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  deposit,
  checkBalance,
  withdraw,
  remove,
  transfer,
  avgBalance,
  topByBalanceLowest,
  topByBalanceHeighest,
  transferToPrivate,
};
