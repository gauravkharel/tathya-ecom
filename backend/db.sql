INSERT INTO roles (name) VALUES ('user'), ('admin'),('editor');

<<<<<<< refs/remotes/origin/feat/cart
select u.email, r.name, r.id from users u full outer join roles r on u."roleId" = r.id where r.id = 1;
=======
select u.email, r.name, r.id from users u full outer join roles r on u."roleId" = r.id where r.id = 1;

-- using chatgpt to generate sql data
-- Insert sample brands
INSERT INTO brand (name) VALUES
('Gucci'),
('Prada'),
('Nike'),
('Adidas'),
('Puma');

INSERT INTO category (id, name) VALUES
(14, 'Tiia'),
(15, 'GUU Stran'),
(16, 'GKgod'),
(17, 'Tulips'),
(18, 'YaTa');

INSERT INTO category (id, name) VALUES
(8, 'Tig');
-- Insert sample genders
INSERT INTO gender (id, name) VALUES
(1, 'Men'),
(2, 'Women'),
(3, 'Unisex');

-- Insert sample categories
INSERT INTO category (name) VALUES
('Shirts'),
('Pants'),
('Shoes'),
('Jackets'),
('Accessories');


INSERT INTO clothing (name, description, price, stock, "brandId", "genderId", "categoryId")
VALUES
('Gucci Shirt', 'Stylish Gucci shirt for men', 150.00, 50, 1, 1, 1),
('Versace Dress', 'Elegant Versace dress for women', 300.00, 30, 2, 2, 2),
('Nike Sneakers', 'Comfortable Nike sneakers', 120.00, 100, 3, 1, 3),
('Adidas Hoodie', 'Warm Adidas hoodie for men', 80.00, 70, 4, 1, 4),
('Calvin Klein Jeans', 'Classic Calvin Klein jeans', 90.00, 60, 5, 1, 5),
('Chanel Perfume', 'Luxurious Chanel perfume', 250.00, 20, 6, 2, 6),
('Tommy Hilfiger T-Shirt', 'Casual Tommy Hilfiger t-shirt', 50.00, 80, 7, 1, 7),
('Prada Handbag', 'Fashionable Prada handbag', 500.00, 25, 8, 2, 8),
('Hugo Boss Suit', 'Sophisticated Hugo Boss suit', 600.00, 10, 9, 1, 9),
('Fendi Sunglasses', 'Trendy Fendi sunglasses', 180.00, 40, 10, 2, 10),
('Louis Vuitton Belt', 'Luxury Louis Vuitton belt', 300.00, 35, 11, 1, 11),
('Dolce & Gabbana Dress', 'Chic Dolce & Gabbana dress', 400.00, 15, 12, 2, 12),
('Puma Joggers', 'Comfortable Puma joggers', 70.00, 90, 13, 1, 13),
('Burberry Scarf', 'Stylish Burberry scarf', 120.00, 55, 14, 1, 14),
('Armani Watch', 'Elegant Armani watch', 700.00, 5, 15, 1, 15),
('Gucci Backpack', 'Fashionable Gucci backpack', 400.00, 30, 1, 1, 16),
('Ralph Lauren Polo', 'Classic Ralph Lauren polo shirt', 80.00, 75, 2, 1, 17),
('Michael Kors Handbag', 'Stylish Michael Kors handbag', 250.00, 18, 3, 2, 18),
('Supreme Hoodie', 'Trendy Supreme hoodie', 150.00, 65, 4, 1, 1),
('Givenchy Perfume', 'Luxurious Givenchy perfume', 280.00, 22, 5, 2, 2),
('Balenciaga Sneakers', 'Fashionable Balenciaga sneakers', 350.00, 45, 6, 1, 2),
('Alexander McQueen Jacket', 'Edgy Alexander McQueen jacket', 550.00, 12, 7, 1, 2),
('Christian Dior Sunglasses', 'Stylish Christian Dior sunglasses', 320.00, 38, 8, 2, 2),
('Yves Saint Laurent Dress', 'Elegant Yves Saint Laurent dress', 450.00, 8, 9, 2, 2),
('Bottega Veneta Bag', 'Luxury Bottega Veneta bag', 600.00, 28, 10, 1, 2),
('Hublot Watch', 'Luxurious Hublot watch', 900.00, 28, 10, 1, 2);


INSERT INTO clothing (name, description, price, stock, "brandId", "genderId", "categoryId") VALUES ('Puma Casual Jacket', 'A casual jacket from Puma, ideal for everyday wear.', 129.99, 60, 5, 3, 4);


-- Ensure the foreign key references are correct and present in your database.
-- User ID: c0906bf7-96d8-40f0-8674-08dab1bc8092
-- Clothing IDs: from 240 to 289

INSERT INTO orderitem (id,"userId", "clothingId", quantity, "orderDate", "shippingAddress", "billingAddress", "orderStatus", "paymentStatus", "paymentMethod", "totalPrice", "taxAmount", "shippingCost", "discountAmount", "trackingNumber", "estimatedDeliveryDate", comments) VALUES
(uuid_generate_v4(),'c0906bf7-96d8-40f0-8674-08dab1bc8092', 240, 2, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 100.00, 8.00, 5.00, NULL, 'TRACK12345', NULL, 'First order comment'),
(uuid_generate_v4(),'c0906bf7-96d8-40f0-8674-08dab1bc8092', 241, 1, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'ESEWA', 50.00, 4.00, 5.00, NULL, 'TRACK12346', NULL, 'Second order comment'),
(uuid_generate_v4(),'c0906bf7-96d8-40f0-8674-08dab1bc8092', 242, 3, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 150.00, 12.00, 5.00, 10.00, 'TRACK12347', NULL, 'Third order comment'),
(uuid_generate_v4(),'c0906bf7-96d8-40f0-8674-08dab1bc8092', 243, 4, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 200.00, 16.00, 5.00, 15.00, 'TRACK12348', NULL, 'Fourth order comment'),
(uuid_generate_v4(),'c0906bf7-96d8-40f0-8674-08dab1bc8092', 244, 2, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'ESEWA', 100.00, 8.00, 5.00, NULL, 'TRACK12349', NULL, 'Fifth order comment'),
(uuid_generate_v4(),'c0906bf7-96d8-40f0-8674-08dab1bc8092', 245, 1, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 60.00, 4.80, 5.00, NULL, 'TRACK12350', NULL, 'Sixth order comment'),
(uuid_generate_v4(),'c0906bf7-96d8-40f0-8674-08dab1bc8092', 246, 5, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'ESEWA', 300.00, 24.00, 5.00, 20.00, 'TRACK12351', NULL, 'Seventh order comment'),
(uuid_generate_v4(),'c0906bf7-96d8-40f0-8674-08dab1bc8092', 247, 3, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 180.00, 14.40, 5.00, 10.00, 'TRACK12352', NULL, 'Eighth order comment'),
(uuid_generate_v4(),'c0906bf7-96d8-40f0-8674-08dab1bc8092', 248, 2, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'ESEWA', 120.00, 9.60, 5.00, NULL, 'TRACK12353', NULL, 'Ninth order comment'),
(uuid_generate_v4(),'c0906bf7-96d8-40f0-8674-08dab1bc8092', 249, 4, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 250.00, 20.00, 5.00, 15.00, 'TRACK12354', NULL, 'Tenth order comment'),
(uuid_generate_v4(),'c0906bf7-96d8-40f0-8674-08dab1bc8092', 250, 2, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'ESEWA', 100.00, 8.00, 5.00, NULL, 'TRACK12355', NULL, 'Eleventh order comment'),
(uuid_generate_v4(),'c0906bf7-96d8-40f0-8674-08dab1bc8092', 251, 1, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 60.00, 4.80, 5.00, NULL, 'TRACK12356', NULL, 'Twelfth order comment'),
(uuid_generate_v4(),'c0906bf7-96d8-40f0-8674-08dab1bc8092', 252, 5, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'ESEWA', 300.00, 24.00, 5.00, 20.00, 'TRACK12357', NULL, 'Thirteenth order comment'),
(uuid_generate_v4(),'c0906bf7-96d8-40f0-8674-08dab1bc8092', 253, 3, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 180.00, 14.40, 5.00, 10.00, 'TRACK12358', NULL, 'Fourteenth order comment'),
(uuid_generate_v4(),'c0906bf7-96d8-40f0-8674-08dab1bc8092', 254, 2, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'ESEWA', 120.00, 9.60, 5.00, NULL, 'TRACK12359', NULL, 'Fifteenth order comment'),
(uuid_generate_v4(),'c0906bf7-96d8-40f0-8674-08dab1bc8092', 255, 4, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 250.00, 20.00, 5.00, 15.00, 'TRACK12360', NULL, 'Sixteenth order comment'),
(uuid_generate_v4(),'c0906bf7-96d8-40f0-8674-08dab1bc8092', 256, 2, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'ESEWA', 100.00, 8.00, 5.00, NULL, 'TRACK12361', NULL, 'Seventeenth order comment'),
(uuid_generate_v4(),'c0906bf7-96d8-40f0-8674-08dab1bc8092', 257, 1, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 60.00, 4.80, 5.00, NULL, 'TRACK12362', NULL, 'Eighteenth order comment'),
(uuid_generate_v4(),'c0906bf7-96d8-40f0-8674-08dab1bc8092', 258, 5, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'ESEWA', 300.00, 24.00, 5.00, 20.00, 'TRACK12363', NULL, 'Nineteenth order comment'),
(uuid_generate_v4(),'c0906bf7-96d8-40f0-8674-08dab1bc8092', 259, 3, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 180.00, 14.40, 5.00, 10.00, 'TRACK12364', NULL, 'Twentieth order comment'),
(uuid_generate_v4(),'c0906bf7-96d8-40f0-8674-08dab1bc8092', 260, 2, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'ESEWA', 100.00, 8.00, 5.00, NULL, 'TRACK12365', NULL, 'Twenty-first order comment'),
(uuid_generate_v4(),'c0906bf7-96d8-40f0-8674-08dab1bc8092', 261, 1, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 60.00, 4.80, 5.00, NULL, 'TRACK12366', NULL, 'Twenty-second order comment'),
(uuid_generate_v4(),'c0906bf7-96d8-40f0-8674-08dab1bc8092', 262, 5, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'ESEWA', 300.00, 24.00, 5.00, 20.00, 'TRACK12367', NULL, 'Twenty-third order comment'),
(uuid_generate_v4(),'c0906bf7-96d8-40f0-8674-08dab1bc8092', 263, 3, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 180.00, 14.40, 5.00, 10.00, 'TRACK12368', NULL, 'Twenty-fourth order comment'),
(uuid_generate_v4(),'c0906bf7-96d8-40f0-8674-08dab1bc8092', 264, 2, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'ESEWA', 120.00, 9.60, 5.00, NULL, 'TRACK12369', NULL, 'Twenty-fifth order comment'),
(uuid_generate_v4(),'c0906bf7-96d8-40f0-8674-08dab1bc8092', 265, 4, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 250.00, 20.00, 5.00, 15.00, 'TRACK12370', NULL, 'Twenty-sixth order comment'),
(uuid_generate_v4(),'c0906bf7-96d8-40f0-8674-08dab1bc8092', 266, 2, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'ESEWA', 100.00, 8.00, 5.00, NULL, 'TRACK12371', NULL, 'Twenty-seventh order comment'),
(uuid_generate_v4(),'c0906bf7-96d8-40f0-8674-08dab1bc8092', 267, 1, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 60.00, 4.80, 5.00, NULL, 'TRACK12372', NULL, 'Twenty-eighth order comment'),
(uuid_generate_v4(),'c0906bf7-96d8-40f0-8674-08dab1bc8092', 268, 5, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'ESEWA', 300.00, 24.00, 5.00, 20.00, 'TRACK12373', NULL, 'Twenty-ninth order comment'),
(uuid_generate_v4(),'c0906bf7-96d8-40f0-8674-08dab1bc8092', 269, 3, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 180.00, 14.40, 5.00, 10.00, 'TRACK12374', NULL, 'Thirtieth order comment'),
(uuid_generate_v4(),'c0906bf7-96d8-40f0-8674-08dab1bc8092', 270, 2, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'ESEWA', 100.00, 8.00, 5.00, NULL, 'TRACK12375', NULL, 'Thirty-first order comment'),
(uuid_generate_v4(),'c0906bf7-96d8-40f0-8674-08dab1bc8092', 271, 1, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 60.00, 4.80, 5.00, NULL, 'TRACK12376', NULL, 'Thirty-second order comment'),
(uuid_generate_v4(),'c0906bf7-96d8-40f0-8674-08dab1bc8092', 272, 5, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'ESEWA', 300.00, 24.00, 5.00, 20.00, 'TRACK12377', NULL, 'Thirty-third order comment'),
(uuid_generate_v4(),'c0906bf7-96d8-40f0-8674-08dab1bc8092', 273, 3, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 180.00, 14.40, 5.00, 10.00, 'TRACK12378', NULL, 'Thirty-fourth order comment'),
(uuid_generate_v4(),'c0906bf7-96d8-40f0-8674-08dab1bc8092', 274, 2, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'ESEWA', 120.00, 9.60, 5.00, NULL, 'TRACK12379', NULL, 'Thirty-fifth order comment'),
(uuid_generate_v4(),'c0906bf7-96d8-40f0-8674-08dab1bc8092', 275, 4, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 250.00, 20.00, 5.00, 15.00, 'TRACK12380', NULL, 'Thirty-sixth order comment'),
(uuid_generate_v4(),'c0906bf7-96d8-40f0-8674-08dab1bc8092', 276, 2, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'ESEWA', 100.00, 8.00, 5.00, NULL, 'TRACK12381', NULL, 'Thirty-seventh order comment'),
(uuid_generate_v4(),'c0906bf7-96d8-40f0-8674-08dab1bc8092', 277, 1, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 60.00, 4.80, 5.00, NULL, 'TRACK12382', NULL, 'Thirty-eighth order comment'),
(uuid_generate_v4(),'c0906bf7-96d8-40f0-8674-08dab1bc8092', 278, 5, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'ESEWA', 300.00, 24.00, 5.00, 20.00, 'TRACK12383', NULL, 'Thirty-ninth order comment'),
(uuid_generate_v4(),'c0906bf7-96d8-40f0-8674-08dab1bc8092', 279, 3, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 180.00, 14.40, 5.00, 10.00, 'TRACK12384', NULL, 'Fortieth order comment'),
(uuid_generate_v4(),'c0906bf7-96d8-40f0-8674-08dab1bc8092', 280, 2, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'ESEWA', 100.00, 8.00, 5.00, NULL, 'TRACK12385', NULL, 'Forty-first order comment'),
(uuid_generate_v4(),'c0906bf7-96d8-40f0-8674-08dab1bc8092', 281, 1, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 60.00, 4.80, 5.00, NULL, 'TRACK12386', NULL, 'Forty-second order comment');

>>>>>>> local
