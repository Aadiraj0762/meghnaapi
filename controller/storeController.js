const express = require("express");
const router = express.Router();
const Store = require("../models/Store");
const mongoose = require("mongoose");

// Add a store
const addStore = async (req, res) => {
  const {
    storeName,
    addressLine,
    area,
    city,
    state,
    pinCode,
    landmark,
    storeOpenTime,
    storeCloseTime,
    radius,
    status,
    manager,
    user,
    landline,
    latitude,
    longitude,
    storeImage,
  } = req.body;

  try {
    const store = new Store({
      storeName,
      addressLine,
      area,
      city,
      state,
      pinCode,
      landmark,
      storeOpenTime,
      storeCloseTime,
      radius,
      status,
      manager,
      user,
      landline,
      latitude,
      longitude,
      storeImage,
    });

    await store.save();
    res.json(store);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all stores
const getAllStores = async (req, res) => {
  Store.find()
    .then((stores) => {
      res.json(stores);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

// Get a store by ID
const getStoreById = async (req, res) => {
  Store.findById(req.params.id)
    .then((store) => {
      if (!store) {
        res.status(404).json({ message: "Store not found" });
      } else {
        res.json(store);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

// Update a store
const updateStore = async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  Store.findByIdAndUpdate(id, updateData, { new: true })
    .then((store) => {
      if (!store) {
        res.status(404).json({ message: "Store not found" });
      } else {
        res.json(store);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

// Delete a store
const deleteStore = async (req, res) => {
  const id = req.params.id;
  Store.findByIdAndRemove(id)
    .then(() => {
      res.json({ message: "Store deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

async function getStoresByRadius(req, res) {
  try {
    const radius = req.params.radius;
    const stores = await Store.find({
      where: {
        distance: {
          [Op.gt]: radius,
        },
      },
    });

    res.json(stores);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}
module.exports = {
  addStore,
  getAllStores,
  getStoreById,
  updateStore,
  deleteStore,
  getStoresByRadius,
};
