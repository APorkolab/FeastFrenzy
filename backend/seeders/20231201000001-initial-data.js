'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      // Seed Employees (including admin users)
      const hashedPassword = await bcrypt.hash('Password123', 12);
      const adminPassword = await bcrypt.hash('AdminPassword123', 12);
      const managerPassword = await bcrypt.hash('ManagerPassword123', 12);

      const employees = [
        // Admin users
        {
          id: 1,
          employeeId: 'ADMIN001',
          name: 'System Administrator',
          email: 'admin@feastfrenzy.com',
          password: adminPassword,
          role: 'admin',
          department: 'IT',
          balance: 1000.00,
          isActive: true,
          hireDate: new Date('2020-01-01'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          employeeId: 'MGR001',
          name: 'Operations Manager',
          email: 'manager@feastfrenzy.com',
          password: managerPassword,
          role: 'manager',
          department: 'Operations',
          balance: 500.00,
          isActive: true,
          hireDate: new Date('2020-06-01'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Regular employees for different departments
        {
          id: 3,
          employeeId: 'EMP001',
          name: 'Alice Johnson',
          email: 'alice.johnson@feastfrenzy.com',
          password: hashedPassword,
          role: 'employee',
          department: 'Engineering',
          balance: 150.00,
          isActive: true,
          hireDate: new Date('2021-03-15'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          employeeId: 'EMP002',
          name: 'Bob Smith',
          email: 'bob.smith@feastfrenzy.com',
          password: hashedPassword,
          role: 'employee',
          department: 'Engineering',
          balance: 200.00,
          isActive: true,
          hireDate: new Date('2021-04-01'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          employeeId: 'EMP003',
          name: 'Carol Davis',
          email: 'carol.davis@feastfrenzy.com',
          password: hashedPassword,
          role: 'employee',
          department: 'Marketing',
          balance: 75.50,
          isActive: true,
          hireDate: new Date('2021-07-10'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 6,
          employeeId: 'EMP004',
          name: 'David Wilson',
          email: 'david.wilson@feastfrenzy.com',
          password: hashedPassword,
          role: 'employee',
          department: 'Sales',
          balance: 120.25,
          isActive: true,
          hireDate: new Date('2021-09-05'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 7,
          employeeId: 'EMP005',
          name: 'Emma Brown',
          email: 'emma.brown@feastfrenzy.com',
          password: hashedPassword,
          role: 'employee',
          department: 'HR',
          balance: 90.00,
          isActive: true,
          hireDate: new Date('2022-01-12'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 8,
          employeeId: 'EMP006',
          name: 'Frank Miller',
          email: 'frank.miller@feastfrenzy.com',
          password: hashedPassword,
          role: 'employee',
          department: 'Finance',
          balance: 175.75,
          isActive: true,
          hireDate: new Date('2022-03-20'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 9,
          employeeId: 'EMP007',
          name: 'Grace Lee',
          email: 'grace.lee@feastfrenzy.com',
          password: hashedPassword,
          role: 'employee',
          department: 'Engineering',
          balance: 110.30,
          isActive: true,
          hireDate: new Date('2022-05-15'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 10,
          employeeId: 'EMP008',
          name: 'Henry Chen',
          email: 'henry.chen@feastfrenzy.com',
          password: hashedPassword,
          role: 'employee',
          department: 'Operations',
          balance: 85.00,
          isActive: true,
          hireDate: new Date('2022-08-01'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Inactive employee for testing
        {
          id: 11,
          employeeId: 'EMP009',
          name: 'Former Employee',
          email: 'former@feastfrenzy.com',
          password: hashedPassword,
          role: 'employee',
          department: 'Engineering',
          balance: 0.00,
          isActive: false,
          hireDate: new Date('2021-01-01'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      await queryInterface.bulkInsert('Employees', employees, { transaction });

      // Seed Products
      const products = [
        // Beverages
        {
          id: 1,
          name: 'Coffee',
          description: 'Premium coffee blend, freshly brewed',
          price: 2.50,
          category: 'Beverages',
          isAvailable: true,
          stock: 100,
          imageUrl: 'https://example.com/images/coffee.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'Tea',
          description: 'Assorted tea varieties',
          price: 2.00,
          category: 'Beverages',
          isAvailable: true,
          stock: 80,
          imageUrl: 'https://example.com/images/tea.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          name: 'Fresh Orange Juice',
          description: 'Freshly squeezed orange juice',
          price: 3.00,
          category: 'Beverages',
          isAvailable: true,
          stock: 50,
          imageUrl: 'https://example.com/images/orange-juice.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          name: 'Water Bottle',
          description: 'Pure spring water - 500ml',
          price: 1.00,
          category: 'Beverages',
          isAvailable: true,
          stock: 200,
          imageUrl: 'https://example.com/images/water.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          name: 'Soda',
          description: 'Assorted soft drinks',
          price: 1.50,
          category: 'Beverages',
          isAvailable: true,
          stock: 120,
          imageUrl: 'https://example.com/images/soda.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Food Items
        {
          id: 6,
          name: 'Turkey Sandwich',
          description: 'Roasted turkey with lettuce, tomato, and mayo on whole grain bread',
          price: 6.50,
          category: 'Food',
          isAvailable: true,
          stock: 25,
          imageUrl: 'https://example.com/images/turkey-sandwich.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 7,
          name: 'Chicken Caesar Salad',
          description: 'Fresh romaine lettuce with grilled chicken, parmesan, and caesar dressing',
          price: 8.00,
          category: 'Food',
          isAvailable: true,
          stock: 20,
          imageUrl: 'https://example.com/images/caesar-salad.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 8,
          name: 'Vegetarian Wrap',
          description: 'Hummus, vegetables, and cheese in a whole wheat tortilla',
          price: 5.75,
          category: 'Food',
          isAvailable: true,
          stock: 30,
          imageUrl: 'https://example.com/images/veggie-wrap.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 9,
          name: 'Margherita Pizza Slice',
          description: 'Classic pizza with tomato sauce, mozzarella, and basil',
          price: 4.25,
          category: 'Food',
          isAvailable: true,
          stock: 40,
          imageUrl: 'https://example.com/images/pizza-slice.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 10,
          name: 'Soup of the Day',
          description: 'Freshly prepared daily soup with crackers',
          price: 4.00,
          category: 'Food',
          isAvailable: true,
          stock: 15,
          imageUrl: 'https://example.com/images/soup.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Snacks
        {
          id: 11,
          name: 'Mixed Nuts',
          description: 'Premium mixed nuts - almonds, cashews, walnuts',
          price: 3.50,
          category: 'Snacks',
          isAvailable: true,
          stock: 60,
          imageUrl: 'https://example.com/images/mixed-nuts.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 12,
          name: 'Granola Bar',
          description: 'Healthy oat and honey granola bar',
          price: 2.25,
          category: 'Snacks',
          isAvailable: true,
          stock: 90,
          imageUrl: 'https://example.com/images/granola-bar.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 13,
          name: 'Fresh Fruit Cup',
          description: 'Seasonal fresh fruit mix',
          price: 3.75,
          category: 'Snacks',
          isAvailable: true,
          stock: 35,
          imageUrl: 'https://example.com/images/fruit-cup.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 14,
          name: 'Yogurt Parfait',
          description: 'Greek yogurt with granola and berries',
          price: 4.50,
          category: 'Snacks',
          isAvailable: true,
          stock: 25,
          imageUrl: 'https://example.com/images/yogurt-parfait.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 15,
          name: 'Potato Chips',
          description: 'Crispy potato chips - various flavors',
          price: 1.75,
          category: 'Snacks',
          isAvailable: true,
          stock: 100,
          imageUrl: 'https://example.com/images/chips.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Desserts
        {
          id: 16,
          name: 'Chocolate Cookie',
          description: 'Freshly baked chocolate chip cookie',
          price: 2.00,
          category: 'Desserts',
          isAvailable: true,
          stock: 50,
          imageUrl: 'https://example.com/images/chocolate-cookie.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 17,
          name: 'Apple Pie Slice',
          description: 'Homemade apple pie with cinnamon',
          price: 3.25,
          category: 'Desserts',
          isAvailable: true,
          stock: 20,
          imageUrl: 'https://example.com/images/apple-pie.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 18,
          name: 'Ice Cream Cup',
          description: 'Vanilla ice cream - single serving',
          price: 2.75,
          category: 'Desserts',
          isAvailable: true,
          stock: 30,
          imageUrl: 'https://example.com/images/ice-cream.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Out of stock item for testing
        {
          id: 19,
          name: 'Special Sandwich',
          description: 'Limited edition sandwich',
          price: 7.00,
          category: 'Food',
          isAvailable: false,
          stock: 0,
          imageUrl: 'https://example.com/images/special-sandwich.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      await queryInterface.bulkInsert('Products', products, { transaction });

      // Seed some sample purchases for realistic data
      const purchases = [
        {
          id: 1,
          employeeId: 3, // Alice Johnson
          totalAmount: 8.50,
          status: 'completed',
          paymentMethod: 'balance',
          notes: 'Lunch order',
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
          updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
        {
          id: 2,
          employeeId: 4, // Bob Smith
          totalAmount: 6.50,
          status: 'completed',
          paymentMethod: 'balance',
          notes: 'Quick lunch',
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
          updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        },
        {
          id: 3,
          employeeId: 5, // Carol Davis
          totalAmount: 4.50,
          status: 'completed',
          paymentMethod: 'balance',
          notes: 'Afternoon snack',
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
          updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        },
        {
          id: 4,
          employeeId: 6, // David Wilson
          totalAmount: 12.25,
          status: 'completed',
          paymentMethod: 'balance',
          notes: 'Team lunch',
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
          updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        },
        {
          id: 5,
          employeeId: 7, // Emma Brown
          totalAmount: 3.75,
          status: 'completed',
          paymentMethod: 'balance',
          notes: 'Healthy snack',
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
          updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        },
      ];

      await queryInterface.bulkInsert('Purchases', purchases, { transaction });

      // Seed purchase items
      const purchaseItems = [
        // Purchase 1 items (Alice Johnson - $8.50)
        {
          id: 1,
          purchaseId: 1,
          productId: 6, // Turkey Sandwich
          quantity: 1,
          unitPrice: 6.50,
          subtotal: 6.50,
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
        {
          id: 2,
          purchaseId: 1,
          productId: 1, // Coffee
          quantity: 1,
          unitPrice: 2.00, // Different price at time of purchase
          subtotal: 2.00,
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },

        // Purchase 2 items (Bob Smith - $6.50)
        {
          id: 3,
          purchaseId: 2,
          productId: 6, // Turkey Sandwich
          quantity: 1,
          unitPrice: 6.50,
          subtotal: 6.50,
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        },

        // Purchase 3 items (Carol Davis - $4.50)
        {
          id: 4,
          purchaseId: 3,
          productId: 14, // Yogurt Parfait
          quantity: 1,
          unitPrice: 4.50,
          subtotal: 4.50,
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        },

        // Purchase 4 items (David Wilson - $12.25)
        {
          id: 5,
          purchaseId: 4,
          productId: 7, // Chicken Caesar Salad
          quantity: 1,
          unitPrice: 8.00,
          subtotal: 8.00,
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        },
        {
          id: 6,
          purchaseId: 4,
          productId: 9, // Pizza Slice
          quantity: 1,
          unitPrice: 4.25,
          subtotal: 4.25,
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        },

        // Purchase 5 items (Emma Brown - $3.75)
        {
          id: 7,
          purchaseId: 5,
          productId: 13, // Fresh Fruit Cup
          quantity: 1,
          unitPrice: 3.75,
          subtotal: 3.75,
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        },
      ];

      await queryInterface.bulkInsert('PurchaseItems', purchaseItems, { transaction });

      await transaction.commit();
      console.log('✅ Database seeded successfully with initial data');

    } catch (error) {
      await transaction.rollback();
      console.error('❌ Error seeding database:', error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      // Delete in reverse order due to foreign key constraints
      await queryInterface.bulkDelete('PurchaseItems', null, { transaction });
      await queryInterface.bulkDelete('Purchases', null, { transaction });
      await queryInterface.bulkDelete('Products', null, { transaction });
      await queryInterface.bulkDelete('Employees', null, { transaction });

      await transaction.commit();
      console.log('✅ Database unseeded successfully');

    } catch (error) {
      await transaction.rollback();
      console.error('❌ Error unseeding database:', error);
      throw error;
    }
  },
};
