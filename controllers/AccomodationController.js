const Accommodation = require("../models/Accomodation");

// Obtener todos los alojamientos
const getAllAccommodations = async (req, res) => {
  try {
    const accommodations = await Accommodation.find();
    res.json(accommodations);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

// Obtener un alojamiento por ID
const getAccommodationById = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);
    if (!accommodation) res.status(404).json("Alojamiento no encontrado");
    res.json(accommodation);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

// Crear un nuevo alojamiento
const createAccommodation = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      capacity,
      extraPrice,
      address,
      amenities,
    } = req.body;
    const newAccommodation = new Accommodation({
      title,
      description,
      price,
      capacity,
      extraPrice,
      image: req.file.firebaseUrl,
      address,
      amenities,
    });
    await newAccommodation.save();
    res.json("Alojamiento creado!");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

// Eliminar un alojamiento
const deleteAccommodation = async (req, res) => {
  try {
    await Accommodation.findByIdAndDelete(req.params.id);
    res.json("Alojamiento eliminado.");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

// Actualizar un alojamiento
const updateAccommodation = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);
    if (!accommodation) res.status(404).json("Alojamiento no encontrado");

    const {
      title,
      description,
      price,
      capacity,
      extraPrice,
      address,
      amenities,
    } = req.body;
    accommodation.title = title;
    accommodation.description = description;
    accommodation.price = price;
    accommodation.capacity = capacity;
    accommodation.extraPrice = extraPrice;
    accommodation.address = address;
    accommodation.amenities = amenities;

    await accommodation.save();
    res.json("Alojamiento actualizado!");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

module.exports = {
  getAllAccommodations,
  getAccommodationById,
  createAccommodation,
  deleteAccommodation,
  updateAccommodation,
};
