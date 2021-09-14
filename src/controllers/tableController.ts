import database from "../db";

const create = async (request, response) => {
  try {
    if (!request.body.table.cpfWaiter) return response.status(400).json({
      success: false,
      message: 'O campo cpfGarcom é obrigatório'
    })

    return response.json({
      success: true,
      table: await database.table.create(request.body.table)
    });
  } catch (error) {
    console.log('ERROR ---> ', error);
    return response.status(500).json({
      success: false,
      message: 'Ocorreu um erro ao realizar a operação, tente novamente mais tarde.',
      error: error.toString()
    });
  }
}

const getAll = async (request, response) => {
  try {
    return response.json({
      success: true,
      tables: await database.table.findAll()
    });
  } catch (error) {
    console.log('ERROR ---> ', error);
    return response.status(500).json({
      success: false,
      message: 'Ocorreu um erro ao realizar a operação, tente novamente mais tarde.',
      error: error.toString()
    })
  }
}

const getOne = async (request, response) => {
  try {
    return response.json({
      success: true,
      table: await database.table.findByPk(request.params.id)
    });
  } catch (error) {
    console.log('ERROR ---> ', error);
    return response.status(500).json({
      success: false,
      message: 'Ocorreu um erro ao realizar a operação, tente novamente mais tarde.',
      error: error.toString()
    })
  }
}

const edit = async (request, response) => {
  try {
    await database.table.update(request.body.table, { where: { idTable: request.params.id } })
    return response.json({
      success: true
    });
  } catch (error) {
    console.log('ERROR ---> ', error);
    return response.status(500).json({
      success: false,
      message: 'Ocorreu um erro ao realizar a operação, tente novamente mais tarde.',
      error: error.toString()
    })
  }
}

const destroy = async (request, response) => {
  try {
    await database.table.destroy({ where: { idTable: request.params.id } })
    return response.json({
      success: true
    });
  } catch (error) {
    console.log('ERROR ---> ', error);
    return response.status(500).json({
      success: false,
      message: 'Ocorreu um erro ao realizar a operação, tente novamente mais tarde.',
      error: error.toString()
    })
  }
}

export default { create, getAll, getOne, edit, destroy }
