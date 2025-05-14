const pool = require('../config/db');
const sendTransactionEvent = require('../kafka/producer');

const transferFunds = async ({ senderBIC, receiverBIC, amount }) => {
  try {
    const senderRes = await pool.query('SELECT solde FROM banques WHERE bic = $1', [senderBIC]);
    const receiverRes = await pool.query('SELECT solde FROM banques WHERE bic = $1', [receiverBIC]);

    if (senderRes.rows.length === 0 || receiverRes.rows.length === 0)
      return { success: false, message: 'Banque inconnue' };

    const senderSolde = parseFloat(senderRes.rows[0].solde);
    if (senderSolde < amount)
      return { success: false, message: 'Fonds insuffisants' };

    await pool.query('BEGIN');
    await pool.query('UPDATE banques SET solde = solde - $1 WHERE bic = $2', [amount, senderBIC]);
    await pool.query('UPDATE banques SET solde = solde + $1 WHERE bic = $2', [amount, receiverBIC]);
    await pool.query('COMMIT');

    await sendTransactionEvent({ senderBIC, receiverBIC, amount, date: new Date() });

    return { success: true, message: 'Transfert réussi' };
  } catch (err) {
    await pool.query('ROLLBACK');
    return { success: false, message: err.message };
  }
};

module.exports = transferFunds;
