import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    let balance = {} as Balance;
    const incomeList = transactions.filter((transaction) => {
      return transaction.type === 'income';
    });
    const outcomeList = transactions.filter((transaction) => {
      return transaction.type === 'outcome';
    });


    balance.income = incomeList.reduce((sum, income) => {
      return sum + Number(income.value);
    }, 0);
    balance.outcome = outcomeList.reduce((sum, outcome) => {
      return sum + Number(outcome.value);
    }, 0);
    balance.total = balance.income - balance.outcome;

    return balance;
  }
}

export default TransactionsRepository;
