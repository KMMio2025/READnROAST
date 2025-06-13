
INSERT INTO item (id, name, description, quantity) VALUES
  (1, 'The Hobbit', 'A fantasy novel by J.R.R. Tolkien', 10),
  (2, 'Dune', 'A science fiction novel by Frank Herbert', 8),
  (3, 'The Girl with the Dragon Tattoo', 'A thriller by Stieg Larsson', 12),
  (4, 'Pride and Prejudice', 'A romance by Jane Austen', 5),
  (5, 'Sherlock Holmes: A Study in Scarlet', 'Mystery novel by Arthur Conan Doyle', 7),
  (6, 'The Shining', 'A horror novel by Stephen King', 6),
  (7, 'The Book Thief', 'Historical fiction by Markus Zusak', 9),
  (8, 'Steve Jobs', 'Biography by Walter Isaacson', 3),
  (9, 'Crime and Punishment', 'A classic novel by Dostoevsky', 4),
  (10, 'Treasure Island', 'An action and adventure classic by R.L. Stevenson', 10),

  (11, 'Ethiopian Light Roast', 'Light and floral Ethiopian coffee', 15),
  (12, 'Kenyan Medium Roast', 'Fruity coffee with medium acidity', 20),
  (13, 'Brazilian Nutty Roast', 'Nutty dark roast from Brazil', 18),
  (14, 'Guatemalan Chocolate Roast', 'Smooth chocolatey notes', 12),
  (15, 'Vietnamese Robusta', 'Strong bold Robusta beans', 25),
  (16, 'Colombian Classic', 'Balanced medium roast', 22),
  (17, 'Sumatran Spicy Roast', 'Dark roast with spicy aroma', 14),
  (18, 'Indian Monsoon Malabar', 'Low acidity unique flavor', 8),
  (19, 'Honduran Sweet Roast', 'Sweet, medium-bodied roast', 11),
  (20, 'Tanzanian Peaberry', 'Exotic, floral notes', 9);

INSERT INTO book (id, author, genre, language, price) VALUES
  (1, 'J.R.R. Tolkien', 'FANTASY', 'ENGLISH', 19.99),
  (2, 'Frank Herbert', 'SCIENCE_FICTION', 'ENGLISH', 21.50),
  (3, 'Stieg Larsson', 'THRILLER', 'ENGLISH', 17.00),
  (4, 'Jane Austen', 'ROMANCE', 'ENGLISH', 13.25),
  (5, 'Arthur Conan Doyle', 'MYSTERY', 'ENGLISH', 11.75),
  (6, 'Stephen King', 'HORROR', 'ENGLISH', 16.80),
  (7, 'Markus Zusak', 'HISTORICAL_FICTION', 'ENGLISH', 14.90),
  (8, 'Walter Isaacson', 'BIOGRAPHY', 'ENGLISH', 24.99),
  (9, 'Fyodor Dostoevsky', 'CLASSICS', 'ENGLISH', 18.40),
  (10, 'R.L. Stevenson', 'ACTIONnADVENTURE', 'ENGLISH', 15.60);

INSERT INTO coffee (id, origin, roast, flavour, aroma, acidity, number_of_sizes, mix) VALUES
  (11, 'Ethiopia', 'LIGHT', 'FRUITY', 'FLORAL', 'HIGH', 2, 'ARABICA'),
  (12, 'Kenya', 'MEDIUM', 'FRUITY', 'SPICY', 'HIGH', 3, 'ARABICA'),
  (13, 'Brazil', 'DARK', 'NUTTY', 'SWEET', 'LOW', 2, 'ARABICA'),
  (14, 'Guatemala', 'MEDIUM', 'CHOCOLATE', 'SWEET', 'MEDIUM', 2, 'ARABICA'),
  (15, 'Vietnam', 'DARK', 'CHOCOLATE', 'SPICY', 'LOW', 2, 'ROBUSTA'),
  (16, 'Colombia', 'MEDIUM', 'FRUITY', 'SWEET', 'MEDIUM', 2, 'ARABICA'),
  (17, 'Sumatra', 'DARK', 'SPICY', 'SPICY', 'LOW', 1, 'ROBUSTA'),
  (18, 'India', 'MEDIUM', 'NUTTY', 'SWEET', 'LOW', 2, 'ARABICA'),
  (19, 'Honduras', 'LIGHT', 'CHOCOLATE', 'FLORAL', 'MEDIUM', 2, 'ARABICA'),
  (20, 'Tanzania', 'LIGHT', 'FRUITY', 'FLORAL', 'HIGH', 3, 'ARABICA');

INSERT INTO coffee_sizes (coffee_id, sizes) VALUES
  (11, 250), (11, 350),
  (12, 200), (12, 300), (12, 400),
  (13, 250), (13, 350),
  (14, 250), (14, 400),
  (15, 300), (15, 400),
  (16, 200), (16, 300),
  (17, 350),
  (18, 250), (18, 350),
  (19, 200), (19, 300),
  (20, 200), (20, 300), (20, 400);

INSERT INTO coffee_prices (coffee_id, prices) VALUES
  (11, 35), (11, 45),
  (12, 30), (12, 40), (12, 50),
  (13, 28), (13, 38),
  (14, 32), (14, 44),
  (15, 25), (15, 32),
  (16, 30), (16, 39),
  (17, 40),
  (18, 31), (18, 38),
  (19, 29), (19, 35),
  (20, 34), (20, 41), (20, 52);
