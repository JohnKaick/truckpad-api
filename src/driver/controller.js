const express = require('express');
const mongoose = require('mongoose');
const upload = require('../../storage.js')

const router = express.Router()
const Driver = mongoose.model('Driver')

router.get('/get-all', async (req, res, next) => {

    try {
        const drivers = await Driver.find({}).sort({ created_at: -1 })

        res.send(drivers)
    } catch (err) {
        res.status(401).send({ error: 'get all drivers failed' });
    }

})

router.get('/get-one/:driver_id', async (req, res, next) => {

    const { driver_id } = req.params

    try {
        const driver = await Driver.findById(driver_id)

        res.send(driver)
    } catch (err) {
        res.status(401).send({ error: 'get one driver failed' });
    }

})

router.put('/insert', async (req, res, next) => {

    const {
        name,
        birth_date,
        state,
        city,
        addresses_street_name,
        addresses_state,
        addresses_country,
        addresses_neighborhood,
        addresses_city,
        addresses_street_number,
        addresses_complement,
        addresses_postal_code,
        documents_expires_at_cnh,
        documents_country_cnh,
        documents_number_cnh,
        documents_doc_type_cnh,
        documents_category_cnh,
        documents_country_cpf,
        documents_number_cpf,
        documents_doc_type_cpf,
    } = req.body

    try {

        await Driver.create({
            name,
            birth_date: new Date(birth_date),
            state: state ? state : addresses_state,
            city: city ? city : addresses_city,
            addresses_street_name,
            addresses_state,
            addresses_country,
            addresses_neighborhood,
            addresses_city,
            addresses_street_number,
            addresses_complement,
            addresses_postal_code,
            documents_expires_at_cnh,
            documents_country_cnh,
            documents_number_cnh,
            documents_doc_type_cnh,
            documents_category_cnh,
            documents_country_cpf,
            documents_number_cpf,
            documents_doc_type_cpf,
            image_path: null,
            active: true,
            created_at: new Date()
        }, function (err, docs) {
            if (err) return console.log('mongo_error: ' + err);
            res.send(docs._id)
        })

    } catch (err) {
        res.status(401).send({ error: 'create driver failed' });
    }

})

router.post('/edit/:driver_id', async (req, res, next) => {

    const { driver_id } = req.params

    const {
        name,
        birth_date,
        state,
        city,
        addresses_street_name,
        addresses_state,
        addresses_country,
        addresses_neighborhood,
        addresses_city,
        addresses_street_number,
        addresses_complement,
        addresses_postal_code,
        documents_expires_at_cnh,
        documents_country_cnh,
        documents_number_cnh,
        documents_doc_type_cnh,
        documents_category_cnh,
        documents_country_cpf,
        documents_number_cpf,
        documents_doc_type_cpf
    } = req.body

    try {

        await Driver.findByIdAndUpdate(driver_id, {
            $set: {
                name,
                birth_date: new Date(birth_date),
                state: state ? state : addresses_state,
                city: city ? city : addresses_city,
                addresses_street_name,
                addresses_state,
                addresses_country,
                addresses_neighborhood,
                addresses_city,
                addresses_street_number,
                addresses_complement,
                addresses_postal_code,
                documents_expires_at_cnh,
                documents_country_cnh,
                documents_number_cnh,
                documents_doc_type_cnh,
                documents_category_cnh,
                documents_country_cpf,
                documents_number_cpf,
                documents_doc_type_cpf
            }
        })

        res.sendStatus(200)

    } catch (err) {
        res.status(401).send({ error: 'update driver failed' });
    }

})

router.post('/status/:driver_id', async (req, res, next) => {

    const { driver_id } = req.params
    const { active } = req.body

    try {

        await Driver.findByIdAndUpdate(driver_id, {
            $set: {
                active,
            }
        })

        res.sendStatus(200)

    } catch (err) {
        res.status(401).send({ error: 'status driver failed' });
    }

})

router.post('/upload/:driver_id', upload.single('file'), async (req, res, next) => {

    const { driver_id } = req.params
    const {
        fieldname,
        originalname,
        encoding,
        mimetype,
        destination,
        filename,
        path,
        size
    } = req.file

    try {
        await Driver.findByIdAndUpdate(driver_id, {
            $set: {
                image_path: path,
            }
        }, function (err, docs) {
            if (err) return console.log('mongo_error: ' + err);
        })
        res.send(path)
    } catch (err) {
        res.status(401).send({ error: 'upload failed' + err });
    }
})

module.exports = router