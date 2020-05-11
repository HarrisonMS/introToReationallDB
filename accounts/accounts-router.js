const express = require('express')
const knex = require('../data/dbConfig')
const router = express.Router()

router.get('/', (req, res) => {
  knex
    .select('*')
    .from('accounts')
    .then((accounts) => {
      if (accounts) {
        res.status(200).json(accounts)
      } else {
        res
          .status(404)
          .json({ message: 'there are no accounts in the database' })
      }
    })
    .catch((error) => {
      console.log(error.message)
      res.status(500).json(error.message)
    })
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  knex
    .select('*')
    .from('accounts')
    .where({ id })
    .then((account) => {
      console.log(account)
    })
    .catch((error) => {
      console.log(error.message)
      res.status(500).json(error.message)
    })
})

module.exports = router
