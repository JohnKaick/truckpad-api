module.exports = function (mongoose, Types) {

    const DriverSchema = mongoose.Schema({
        name: { type: String },
        birth_date: { type: String },
        state: { type: String },
        city: { type: String },
        addresses_street_name: { type: String },
        addresses_state: { type: String },
        addresses_country: { type: String },
        addresses_neighborhood: { type: String },
        addresses_city: { type: String },
        addresses_street_number: { type: String },
        addresses_complement: { type: String },
        addresses_postal_code: { type: String },
        documents_expires_at_cnh: { type: String },
        documents_country_cnh: { type: String },
        documents_number_cnh: { type: String },
        documents_doc_type_cnh: { type: String },
        documents_category_cnh: { type: String },
        documents_country_cpf: { type: String },
        documents_number_cpf: { type: String },
        documents_doc_type_cpf: { type: String },
        image_path: { type: String },
        active: { type: Boolean },
        created_at: Date,
    }, { collection: 'driver' });

    return mongoose.model('Driver', DriverSchema);
}