const mongoose = require('mongoose');
const User = require('./models/User');
const Property = require('./models/Property');
const PropertyListing = require('./models/PropertyListing');
const Agent = require('./models/Agent');
const Inquiry = require('./models/Inquiry');
const CommunityPost = require('./models/CommunityPost');

const seedData = async () => {
  console.log('[Seed] Seeding sample Indian real estate data...');

  // 1. Clear existing
  await User.deleteMany({});
  await Property.deleteMany({});
  await PropertyListing.deleteMany({});
  await Agent.deleteMany({});
  await Inquiry.deleteMany({});
  await CommunityPost.deleteMany({});

  // 2. Create Users
  const adminUser = await User.create({
    name: 'Jovan K Thomas (Admin)',
    email: 'admin@realestate.in',
    password: 'password123',
    role: 'Admin',
    phone: '+91 98470 12345',
    city: 'Kochi',
    bio: 'Platform Lead & System Administrator for Indian Real Estate Community.'
  });

  const agentUser1 = await User.create({
    name: 'Rajesh Sharma',
    email: 'rajesh.sharma@mumbairealty.in',
    password: 'password123',
    role: 'Agent',
    phone: '+91 98200 88776',
    city: 'Mumbai',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
    bio: 'Specialist in luxury high-rises across Bandra West, Worli, and Juhu with 12+ years experience.'
  });

  const agentUser2 = await User.create({
    name: 'Priya Sundaram',
    email: 'priya@bengaluruhomes.in',
    password: 'password123',
    role: 'Agent',
    phone: '+91 99001 22334',
    city: 'Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    bio: 'Tech corridor specialist covering Indiranagar, Whitefield, Koramangala, and HSR Layout.'
  });

  const agentUser3 = await User.create({
    name: 'Anand Nair',
    email: 'anand.nair@kochiproperties.in',
    password: 'password123',
    role: 'Agent',
    phone: '+91 94471 99887',
    city: 'Kochi',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
    bio: 'Waterfront villas, Marine Drive apartments, and Kakkanad IT zone developments.'
  });

  const buyerUser1 = await User.create({
    name: 'Rohan Verma',
    email: 'rohan.v@gmail.com',
    password: 'password123',
    role: 'Buyer/Renter',
    phone: '+91 98112 33445',
    city: 'Delhi NCR',
    bio: 'Looking for a 3 BHK luxury flat near Cyber City Gurgaon or South Delhi.'
  });

  const buyerUser2 = await User.create({
    name: 'Ananya Reddy',
    email: 'ananya.reddy@outlook.com',
    password: 'password123',
    role: 'Buyer/Renter',
    phone: '+91 98490 55667',
    city: 'Hyderabad',
    bio: 'Looking to rent a fully furnished apartment near Gachibowli.'
  });

  // 3. Create Agent Profiles
  const agent1 = await Agent.create({
    user: agentUser1._id,
    agencyName: 'Apex Mumbai Luxury Realty',
    reraId: 'A51900012894',
    experienceYears: 12,
    totalDeals: 142,
    specializations: ['Luxury Apartments', 'Sea View Penthouses', 'Commercial Offices'],
    operatingCities: ['Mumbai', 'Thane', 'Navi Mumbai'],
    phone: '+91 98200 88776',
    email: agentUser1.email,
    rating: 4.9,
    reviewsCount: 48,
    verified: true,
    bio: agentUser1.bio,
    avatar: agentUser1.avatar
  });

  const agent2 = await Agent.create({
    user: agentUser2._id,
    agencyName: 'Silicon City Estates',
    reraId: 'PRM/KA/RERA/1251/310/AG/180214/000840',
    experienceYears: 8,
    totalDeals: 86,
    specializations: ['Gated Communities', 'IT Corridor Rentals', 'Villa Plots'],
    operatingCities: ['Bengaluru'],
    phone: '+91 99001 22334',
    email: agentUser2.email,
    rating: 4.8,
    reviewsCount: 32,
    verified: true,
    bio: agentUser2.bio,
    avatar: agentUser2.avatar
  });

  const agent3 = await Agent.create({
    user: agentUser3._id,
    agencyName: 'Malabar Heritage & Modern Living',
    reraId: 'K-RERA/AG/0045/2020',
    experienceYears: 10,
    totalDeals: 95,
    specializations: ['Backwater Villas', 'Marine Drive Condos', 'Kakkanad IT Hub'],
    operatingCities: ['Kochi', 'Trivandrum'],
    phone: '+91 94471 99887',
    email: agentUser3.email,
    rating: 4.9,
    reviewsCount: 29,
    verified: true,
    bio: agentUser3.bio,
    avatar: agentUser3.avatar
  });

  // 4. Create Properties
  const prop1 = await Property.create({
    title: '3 BHK Sea-Facing Ultra-Luxury Apartment',
    description: 'Breathtaking panoramic Arabian sea views in Bandra West. Italian marble flooring, VRV air conditioning, automated smart home lighting, and private elevator access.',
    propertyType: 'Apartment',
    listingType: 'Buy',
    price: 65000000,
    formattedPrice: '₹ 6.50 Cr',
    location: {
      city: 'Mumbai',
      locality: 'Bandra West',
      state: 'Maharashtra',
      address: 'Carter Road, Bandra West, Mumbai 400050',
      pincode: '400050'
    },
    specs: {
      bedRooms: 3,
      bathRooms: 4,
      areaSqFt: 2450,
      bhk: '3 BHK',
      furnishing: 'Fully Furnished',
      floor: '18th Floor',
      facing: 'West'
    },
    amenities: ['Sea View', 'Infinity Swimming Pool', '24/7 Concierge', 'Valet Parking', 'Gymnasium', 'Clubhouse'],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1000&q=80'
    ],
    postedBy: agentUser1._id,
    agent: agent1._id,
    featured: true,
    views: 342
  });

  const prop2 = await Property.create({
    title: '4 BHK Independent Modern Villa with Private Garden',
    description: 'Located in Bengaluru premier gated enclave in Indiranagar. Features private swimming pool, double height ceilings, solar power, and lush landscaped garden.',
    propertyType: 'Villa / House',
    listingType: 'Buy',
    price: 42000000,
    formattedPrice: '₹ 4.20 Cr',
    location: {
      city: 'Bengaluru',
      locality: 'Indiranagar',
      state: 'Karnataka',
      address: '100 Feet Road, Indiranagar, Bengaluru 560038',
      pincode: '560038'
    },
    specs: {
      bedRooms: 4,
      bathRooms: 5,
      areaSqFt: 3800,
      bhk: '4 BHK',
      furnishing: 'Semi-Furnished',
      floor: 'Ground + 2',
      facing: 'East'
    },
    amenities: ['Private Garden', 'Private Pool', 'EV Charging', 'Home Theatre', 'Solar Power', '24x7 Security'],
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1000&q=80'
    ],
    postedBy: agentUser2._id,
    agent: agent2._id,
    featured: true,
    views: 289
  });

  const prop3 = await Property.create({
    title: '2 BHK Premium Waterfront Apartment on Marine Drive',
    description: 'Overlooking Vembanad backwaters on Marine Drive, Kochi. High rental yield property close to Lulu Mall, MG Road, and Kochi Metro.',
    propertyType: 'Apartment',
    listingType: 'Buy',
    price: 11500000,
    formattedPrice: '₹ 1.15 Cr',
    location: {
      city: 'Kochi',
      locality: 'Marine Drive',
      state: 'Kerala',
      address: 'Marine Drive Waterfront Promenade, Kochi 682031',
      pincode: '682031'
    },
    specs: {
      bedRooms: 2,
      bathRooms: 2,
      areaSqFt: 1350,
      bhk: '2 BHK',
      furnishing: 'Fully Furnished',
      floor: '9th Floor',
      facing: 'West'
    },
    amenities: ['Backwater View', 'Rooftop Lounge', 'Covered Parking', 'Speed Boat Jetty', 'Generator Backup'],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=80'
    ],
    postedBy: agentUser3._id,
    agent: agent3._id,
    featured: true,
    views: 198
  });

  const prop4 = await Property.create({
    title: '3 BHK High-Rise Flat for Rent near Cyber City',
    description: 'Spacious 3 BHK apartment in DLF Phase 5 Gurgaon. Fully furnished with modular kitchen, leather sofas, high-speed Wi-Fi, and 2 parking slots.',
    propertyType: 'Apartment',
    listingType: 'Rent',
    price: 65000,
    formattedPrice: '₹ 65,000 / month',
    location: {
      city: 'Delhi NCR',
      locality: 'DLF Phase 5, Gurgaon',
      state: 'Haryana',
      address: 'Golf Course Road, Gurgaon 122002',
      pincode: '122002'
    },
    specs: {
      bedRooms: 3,
      bathRooms: 3,
      areaSqFt: 1950,
      bhk: '3 BHK',
      furnishing: 'Fully Furnished',
      floor: '12th Floor',
      facing: 'North-East'
    },
    amenities: ['Power Backup', 'Gym', 'Tennis Court', 'Squash Court', 'Supermarket Inside', 'Security Guard'],
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1000&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1000&q=80'
    ],
    postedBy: agentUser1._id,
    agent: agent1._id,
    featured: false,
    views: 145
  });

  const prop5 = await Property.create({
    title: 'Commercial Office Space in IT Hub HSR Layout',
    description: 'Plug-and-play 50-seater office space with conference rooms, cafeteria, 100% power backup, and high footfall location.',
    propertyType: 'Commercial',
    listingType: 'Rent',
    price: 180000,
    formattedPrice: '₹ 1.80 Lakh / month',
    location: {
      city: 'Bengaluru',
      locality: 'HSR Layout Sector 1',
      state: 'Karnataka',
      address: 'Outer Ring Road, HSR Layout, Bengaluru 560102',
      pincode: '560102'
    },
    specs: {
      bedRooms: 0,
      bathRooms: 4,
      areaSqFt: 3200,
      bhk: 'Commercial',
      furnishing: 'Fully Furnished',
      floor: '2nd Floor',
      facing: 'North'
    },
    amenities: ['High Speed Elevators', 'Server Room', 'Central AC', '24x7 Security', 'Underground Parking'],
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1000&q=80'
    ],
    postedBy: agentUser2._id,
    agent: agent2._id,
    featured: false,
    views: 110
  });

  // 5. Create Listings
  await PropertyListing.create([
    { property: prop1._id, listingTitle: prop1.title, listingType: 'Featured', seller: agentUser1._id, agent: agent1._id },
    { property: prop2._id, listingTitle: prop2.title, listingType: 'Featured', seller: agentUser2._id, agent: agent2._id },
    { property: prop3._id, listingTitle: prop3.title, listingType: 'Featured', seller: agentUser3._id, agent: agent3._id },
    { property: prop4._id, listingTitle: prop4.title, listingType: 'Standard', seller: agentUser1._id, agent: agent1._id },
    { property: prop5._id, listingTitle: prop5.title, listingType: 'Standard', seller: agentUser2._id, agent: agent2._id }
  ]);

  // 6. Create Sample Inquiries
  await Inquiry.create([
    {
      property: prop1._id,
      sender: buyerUser1._id,
      agent: agent1._id,
      name: buyerUser1.name,
      email: buyerUser1.email,
      phone: buyerUser1.phone,
      message: 'Interested in scheduling a weekend site visit for the Bandra sea-facing apartment.',
      preferredContactMethod: 'Call',
      visitDate: '2026-09-20',
      status: 'Pending'
    },
    {
      property: prop2._id,
      sender: buyerUser2._id,
      agent: agent2._id,
      name: buyerUser2.name,
      email: buyerUser2.email,
      phone: buyerUser2.phone,
      message: 'Would like to inquire about loan pre-approvals and final price negotiations for the Indiranagar Villa.',
      preferredContactMethod: 'WhatsApp',
      visitDate: '2026-09-22',
      status: 'Contacted'
    }
  ]);

  // 7. Create Community Posts
  await CommunityPost.create([
    {
      user: buyerUser1._id,
      userName: buyerUser1.name,
      userRole: 'Buyer/Renter',
      title: 'Looking for 3 BHK Rental in Gurgaon DLF Phase 5 (Budget: ₹ 60k-70k/mo)',
      content: 'Hi Everyone, my family is relocating to Gurgaon next month. Looking for a well-maintained 3 BHK flat with power backup and security. Agents or direct owners please reach out!',
      type: 'Requirement Request',
      category: 'Residential Rent',
      city: 'Delhi NCR',
      budget: '₹ 60,000 - ₹ 70,000 / month',
      comments: [
        {
          user: agentUser1._id,
          userName: agentUser1.name,
          userRole: 'Agent',
          content: 'Hi Rohan! We have a listing in DLF Phase 5 matching your criteria perfectly. Check the property listing section or call me.'
        }
      ]
    },
    {
      user: agentUser2._id,
      userName: agentUser2.name,
      userRole: 'Agent',
      title: 'Bengaluru Real Estate Trends 2026: Why North Bengaluru & Whitefield are Booming',
      content: 'With the metro expansion lines coming live and major IT parks expanding in North Bengaluru, property values have seen an 11% YoY growth. Happy to answer questions regarding property investments here.',
      type: 'Market Discussion',
      category: 'Investment Advice',
      city: 'Bengaluru',
      budget: 'N/A',
      likes: [buyerUser1._id, buyerUser2._id]
    },
    {
      user: buyerUser2._id,
      userName: buyerUser2.name,
      userRole: 'Buyer/Renter',
      title: 'Advice needed: Builder Floor vs Gated Society Apartment in Kochi Kakkanad',
      content: 'Evaluating two options near Infopark Kochi. What are the key maintenance pros and cons between builder floors and gated community towers in Kochi?',
      type: 'Property Advice',
      category: 'Residential Buy',
      city: 'Kochi',
      budget: '₹ 80 Lakhs',
      comments: [
        {
          user: agentUser3._id,
          userName: agentUser3.name,
          userRole: 'Agent',
          content: 'Gated community towers offer better security, power backup, and resale liquidity in Kakkanad compared to standalone builder floors.'
        }
      ]
    }
  ]);

  console.log('[Seed] Indian Real Estate Community database successfully populated!');
};

const runSeedIfEmpty = async () => {
  const count = await Property.countDocuments();
  if (count === 0) {
    await seedData();
  }
};

if (require.main === module) {
  const connectDB = require('./config/db');
  connectDB().then(() => {
    seedData().then(() => process.exit(0));
  });
}

module.exports = { seedData, runSeedIfEmpty };
