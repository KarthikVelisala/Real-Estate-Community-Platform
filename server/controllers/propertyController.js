const Property = require('../models/Property');
const PropertyListing = require('../models/PropertyListing');
const Agent = require('../models/Agent');

// @desc Get all properties with filtering, search & pagination
// @route GET /api/property or /api/propertylisting
const getProperties = async (req, res) => {
  try {
    const { city, listingType, propertyType, minPrice, maxPrice, bhk, search } = req.query;

    let query = {};

    if (city && city !== 'All') {
      query['location.city'] = new RegExp(city, 'i');
    }

    if (listingType && listingType !== 'All') {
      query.listingType = listingType;
    }

    if (propertyType && propertyType !== 'All') {
      query.propertyType = new RegExp(propertyType, 'i');
    }

    if (bhk && bhk !== 'All') {
      query['specs.bhk'] = bhk;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { 'location.locality': new RegExp(search, 'i') },
        { 'location.city': new RegExp(search, 'i') }
      ];
    }

    const properties = await Property.find(query)
      .populate('postedBy', 'name email phone avatar')
      .populate('agent')
      .sort({ createdAt: -1 });

    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get single property by ID
// @route GET /api/property/:id
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('postedBy', 'name email phone avatar')
      .populate('agent');

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Increment view count
    property.views = (property.views || 0) + 1;
    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Create a new property listing
// @route POST /api/property or /api/propertylisting
const createProperty = async (req, res) => {
  try {
    const { 
      title, description, propertyType, listingType, price, formattedPrice,
      city, locality, state, address, bedRooms, bathRooms, areaSqFt, bhk,
      furnishing, amenities, images, featured
    } = req.body;

    let agentId = null;
    if (req.user.role === 'Agent') {
      const agentDoc = await Agent.findOne({ user: req.user._id });
      if (agentDoc) agentId = agentDoc._id;
    }

    const newProperty = await Property.create({
      title,
      description,
      propertyType: propertyType || 'Apartment',
      listingType: listingType || 'Buy',
      price: Number(price),
      formattedPrice: formattedPrice || `₹ ${Number(price).toLocaleString('en-IN')}`,
      location: {
        city: city || 'Mumbai',
        locality: locality || 'Bandra West',
        state: state || 'Maharashtra',
        address: address || ''
      },
      specs: {
        bedRooms: Number(bedRooms) || 2,
        bathRooms: Number(bathRooms) || 2,
        areaSqFt: Number(areaSqFt) || 1100,
        bhk: bhk || `${bedRooms || 2} BHK`,
        furnishing: furnishing || 'Semi-Furnished'
      },
      amenities: amenities || ['Car Parking', '24x7 Security', 'Power Backup', 'Lift'],
      images: images && images.length ? images : [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'
      ],
      postedBy: req.user._id,
      agent: agentId,
      featured: featured || false
    });

    // Also register in PropertyListing model
    await PropertyListing.create({
      property: newProperty._id,
      listingTitle: newProperty.title,
      listingType: newProperty.featured ? 'Featured' : 'Standard',
      seller: req.user._id,
      agent: agentId
    });

    res.status(201).json(newProperty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update property
// @route PUT /api/property/:id
const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Check ownership or admin
    if (property.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Not authorized to update this property' });
    }

    const updated = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete property
// @route DELETE /api/property/:id
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (property.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Not authorized to delete this property' });
    }

    await Property.findByIdAndDelete(req.params.id);
    await PropertyListing.deleteMany({ property: req.params.id });

    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty
};
