// ignore_for_file: file_names

import '../menu-item-model.js';
// import '../menu-type.js';

List<MenuItemModel> initialMenuModelArray = [
  // MenuItemModel(1, '', MenuType.SANDWICH, 'Prosciutto, Fresh Mozzarella', '10.99', '11.99'),
  // MenuItemModel(3, '', MenuType.SANDWICH, 'Ham, Salami, Provolone', '9.99', '10.99'),
  // MenuItemModel(4, '', MenuType.SANDWICH, 'Mortadella, Salami, Provolone', '9.99', '10.99'),
  // MenuItemModel(5, '', MenuType.SANDWICH, 'Turkey, Provolone', '9.99', '10.99'),
  // MenuItemModel(6, '', MenuType.SANDWICH, 'Hot Capicola, Salami, Provolone', '9.99', '10.99'),
  // MenuItemModel(7, '', MenuType.SANDWICH, 'Fresh Mozzarella, Basil, Tomato', '8.99', '9.99'),
  // MenuItemModel(
  //     8, '', MenuType.SANDWICH, 'Speck, Mozzarella, Sun Dried Tomato, Pesto', '10.99', '11.99'),
  // MenuItemModel(9, '', MenuType.SANDWICH, 'Turkey, Arugula, Artichoke, Avocado', '10.99', '11.99'),
  // MenuItemModel(10, '', MenuType.SANDWICH, 'Pork, Turkey, Mayo, Mustard, Swiss, Pickle', '', '11.99'),
  // MenuItemModel(
  //     11,
  //     '',
  //     MenuType.SANDWICH,
  //     'Casa Special Sopressata, Arugula, Mozzarella, Tomato on Multigrain with House Sauce & Roasted Red Peppers',
  //     '10.99',
  //     '11.99'),
  // MenuItemModel(12, '', MenuType.SANDWICH, 'Extra Mozzarella', '', '2.75'),
  // MenuItemModel(13, '', MenuType.SANDWICH, 'Add Fruit Cup', '', '4.95'),
  // MenuItemModel(14, '', MenuType.SANDWICH, 'Add Avocado', '', '2.25'),
  // MenuItemModel(15, '', MenuType.BEVERAGE, 'Cappuccino', '', '4.25'),
  // MenuItemModel(16, '', MenuType.BEVERAGE, 'Latte', '', '4.25'),
  // MenuItemModel(17, '', MenuType.BEVERAGE, 'Espresso', '', '2.99'),
  // MenuItemModel(18, '', MenuType.BEVERAGE, 'Espresso Macchiato', '', '3.50'),
  // MenuItemModel(19, '', MenuType.BEVERAGE, 'Double Espresso', '', '4.25'),
  // MenuItemModel(20, '', MenuType.BEVERAGE, 'Double Macchiato', '', '4.25'),
  // MenuItemModel(21, '', MenuType.BEVERAGE, 'Double Cappuccino', '', '4.59'),
  // MenuItemModel(22, '', MenuType.BEVERAGE, 'Hot/Iced Tea', '', '2.99'),
  // MenuItemModel(23, '', MenuType.BEVERAGE, 'Hot Chocolate', '', '3.29'),
  // MenuItemModel(24, '', MenuType.BEVERAGE, 'Americano', '', '2.99'),
  // MenuItemModel(25, '', MenuType.BEVERAGE, 'All Above Can Be Iced', '', ''),
  // MenuItemModel(26, '', MenuType.BEVERAGE, 'Add a Flavor', '', '0.99'),
  // MenuItemModel(27, '', MenuType.BEVERAGE, 'Almond, Soy, or Coconut Milk', '', '0.99'),
  // MenuItemModel(
  //     28, 'Sandwich', MenuType.BREAKFAST, 'Egg, Ham, Provolone on Toasted Roll or Croissant', '', '9.99'),
  // MenuItemModel(29, 'Maddalena Special', MenuType.BREAKFAST,
  //     '2 Over Easy Eggs, Avocado, Basil, Mozzarella & Tomato on Choice of Bread', '', '9.99'),
  // MenuItemModel(30, 'Eggs', MenuType.BREAKFAST, '2 Eggs on Toast with Fruit', '', '9.99'),
  // MenuItemModel(31, 'Veggie Omelet', MenuType.BREAKFAST,
  //     '3 Eggs with Eggplant, Zucchini, Roasted Peppers & Mozzarella', '', '9.99'),
  // MenuItemModel(32, 'Ham and Cheese', MenuType.BREAKFAST, '3 Eggs with Ham & Provolone', '', '9.99'),
  // MenuItemModel(33, 'Cheese', MenuType.BREAKFAST, '3 Eggs with Provolone', '', '9.99'),
  // MenuItemModel(34, 'Egg White Omelet', MenuType.BREAKFAST, 'Arugula, Tomato & Mozzarella', '', '9.99'),
  // MenuItemModel(
  //     35, 'La Originale', MenuType.PIZZA, 'Tomato Sauce, Mozzarella Cheese', '13.99', '16.99'),
  // MenuItemModel(36, 'Caprese', MenuType.PIZZA, 'Fresh Tomato, Mozzarella, Basil', '15.99', '19.99'),
  // MenuItemModel(
  //     37, "L'Insalata di Pizza", MenuType.PIZZA, 'Mixed Lettuce, Artichoke, Tomato, Tuna', '15.99', '21.99'),
  // MenuItemModel(
  //     38, 'La Diavola', MenuType.PIZZA, 'Tomato Sauce, Mozzarella Cheese, Pepperoni', '16.99', '22.99'),
  // MenuItemModel(
  //     39, 'A La Salizz', MenuType.PIZZA, 'Italian Sausage, Mozzarella, Tomato Sauce', '16.99', '22.99'),
  // MenuItemModel(40, 'Vegetarian', MenuType.PIZZA,
  //     'Mozzarella, Olives, Green Pepper, Mushroom, Artichoke', '16.99', '22.99'),
  // MenuItemModel(41, 'Anna Special', MenuType.PIZZA, 'Mozzarella, Tomato, Ham', '16.99', '22.99'),
  // MenuItemModel(
  //     42, 'Pizza Alla Nutella', MenuType.PIZZA, 'Nutella topped with Powdered Sugar', '15.99', ''),
  // MenuItemModel(43, 'Altamura', MenuType.PIZZA,
  //     'Bresaola, Arugula, Mozzarella Cheese, Shaved Parigiano Cheese, Cherry Tomato', '16.99', '23.99'),
  // MenuItemModel(
  //     44,
  //     'Antipasto Salad',
  //     MenuType.SALAD,
  //     'Mixed Lettuce with Grilled Eggplant, Zucchini, Artichoke, Roasted Peppers, Sun Dried Tomatoes'
  //         ' and Mozzarella topped with Olive Oil and Balsamic Glaze',
  //     '11.99',
  //     '15.99'),
  // MenuItemModel(
  //     45,
  //     'Italian Sushi',
  //     MenuType.SALAD,
  //     'Turkey, Artichoke, Zucchini,Eggplant, Fresh Tomato, Basil, Provolone or Fresh Mozzarella'
  //         ' Rolled on a Bed of Mixed Lettuce',
  //     '11.99',
  //     '15.99'),
  // MenuItemModel(46, 'Caprese Salad', MenuType.SALAD,
  //     'Fresh Tomato and Mozzarella topped with Fresh Basil, Olive Oil, and Balsamic Glaze', '9.99', '13.99'),
  // MenuItemModel(
  //     47,
  //     'Bresalo (Cured Beef) Salad',
  //     MenuType.SALAD,
  //     'Bresalo over Arugula topped with Shaved Parmigiano Cheese, Lemon, black Pepper and Olive Oil',
  //     '',
  //     '15.99'),
  // MenuItemModel(48, '', MenuType.PASTRY, 'Chocolate Croissant', '', '4.00'),
  // MenuItemModel(49, '', MenuType.PASTRY, 'Strawberry & Cream Cheese Croissant', '', '4.00'),
  // MenuItemModel(50, '', MenuType.PASTRY, 'Cream Cheese Croissant', '', '4.00'),
  // MenuItemModel(51, '', MenuType.PASTRY, 'Plain Croissant', '', '4.00'),
  // MenuItemModel(52, '', MenuType.PASTRY, 'Creama Croissant', '', '4.00'),
  // MenuItemModel(53, '', MenuType.PASTRY, 'Muffins', '', '4.00'),
  // MenuItemModel(54, '', MenuType.PASTRY, 'Sfogliatella (Ricotta & Citrus Fruit)', '3.25', '4.00'),
  // MenuItemModel(55, '', MenuType.PASTRY, 'Lobster Tail with Custard & Cream', '', '4.00'),
  // MenuItemModel(56, '', MenuType.PASTRY, 'Cannoli with Ricotta & Chocolate Chip', '3.25', '4.00'),
  // MenuItemModel(57, '', MenuType.PASTRY, 'Chocolate Chip Cookie', '', '4.00'),
  // MenuItemModel(58, '', MenuType.PASTRY, 'Cinnamon Bun', '', '4.00'),
  // MenuItemModel(59, '', MenuType.PASTRY, 'Danish', '', '4.00'),
];
