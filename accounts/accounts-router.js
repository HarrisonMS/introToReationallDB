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
      if (account.length > 0) {
        res.status(200).json(account)
      } else {
        res.status(400).json({
          message:
            'no account information by that id in the database was found',
        })
      }
    })
    .catch((error) => {
      console.log(error.message)
      res.status(500).json(error.message)
    })
})

router.post('/', (req, res) => {
  const postData = req.body
  knex('accounts')
    .insert(postData, 'id')
    .then((ids) => {
      const id = ids[0]
      knex('accounts')
        .where({ id })
        .first()
        .then((newPost) => {
          res.status(201).json(newPost)
        })
        .catch((error) => {
          console.log(error.message)
          res.status(500).json(error.message)
        })
    })
    .catch((error) => {
      console.log(error.message)
      res.status(500).json(error.message)
    })
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const changes = req.body
  if (!changes.name || !changes.budget) {
    res.status(400).json({ messge: 'we need a name and budget on that body' })
  } else {
    knex('accounts')
      .where({ id })
      .update(changes)
      .then((count) => {
        res.status(200).json({ message: `${count} accounts(s) updated` })
      })
      .catch((error) => {
        console.log(error.message)
        res.status(500).json(error.message)
      })
  }
})

router.delete('/:id', (req, res) => {
  knex('accounts')
    .where({ id: req.params.id })
    .del()
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: `${count} account(s) deleted` })
      } else {
        res.status(404).json({
          message: 'There was no account with that id in our database',
        })
      }
    })
    .catch((error) => {
      console.log(error.message)
      res.status(500).json(error.message)
    })
})

module.exports = router
