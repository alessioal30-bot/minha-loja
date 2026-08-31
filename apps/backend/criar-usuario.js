async function run({ container }) {
  const { createUsersWorkflow } = require('@medusajs/core-flows');
  try {
    await createUsersWorkflow(container).run({
      input: {
        users: [{
          email: 'alessioal30@gmail.com',
          password: '10068900Aa#',
          first_name: 'Admin',
          last_name: 'APCM'
        }]
      }
    });
    console.log('🚀 USUARIO CRIADO COM SUCESSO!');
  } catch (err) {
    console.error('Erro ao criar:', err.message);
  }
}

module.exports = run;
module.exports.default = run;
