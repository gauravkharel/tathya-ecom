INSERT INTO roles (name) VALUES ('user'), ('admin'),('editor');

select u.email, r.name, r.id from users u full outer join roles r on u."roleId" = r.id where r.id = 1;

-- using chatgpt to generate sql data
-- Insert sample brands

insert into roles (name) values ('User'), ('Admin'), ('Store');

INSERT INTO brand (id, name) VALUES
(1, 'Levi''s'),
(2, 'Nike'),
(3, 'Zara'),
(4, 'Adidas'),
(5, 'H&M'),
(6, 'Gucci'),
(7, 'Patagonia'),
(8, 'Calvin Klein'),
(9, 'Gap'),
(10, 'Old Navy'),
(11, 'Ralph Lauren'),
(12, 'Tommy Hilfiger'),
(13, 'Under Armour'),
(14, 'Uniqlo'),
(15, 'Supreme'),
(16, 'Forever 21'),
(17, 'Abercrombie & Fitch'),
(18, 'Hollister'),
(19, 'American Eagle Outfitters'),
(20, 'Victoria''s Secret');

-- Top-level categories
INSERT INTO categories (id, name, "parentId") VALUES
(1, 'Women', NULL),
(2, 'Men', NULL),
(3, 'Kids', NULL);

-- Women's subcategories
INSERT INTO categories (id, name, "parentId") VALUES
(101, 'Dresses', 1),
(102, 'Tops', 1),
(103, 'Bottoms', 1),
(104, 'Outerwear', 1),
(105, 'Swimwear', 1);

-- Men's subcategories
INSERT INTO categories (id, name, "parentId") VALUES
(201, 'Shirts', 2),
(202, 'Pants', 2),  
(203, 'Suits', 2),
(204, 'Outerwear', 2),
(205, 'Swimwear', 2);

-- Kids' subcategories
INSERT INTO categories (id, name, "parentId") VALUES
(301, 'Girls', 3),
(302, 'Boys', 3),
(303, 'Babies', 3);

-- Further nesting for Women's Dresses
INSERT INTO categories (id, name, "parentId") VALUES
(1001, 'Casuals', 101),
(1002, 'Formals', 101),
(1003, 'Maxi', 101);

-- Further nesting for Men's Shirts
INSERT INTO categories (id, name, "parentId") VALUES
(2001, 'T-Shirts', 201),
(2002, 'Dress Shirts', 201),
(2003, 'Polo Shirts', 201);

-- Further nesting for Kids' Girls
INSERT INTO categories (id, name, "parentId") VALUES
(3001, 'Girls'' Dresses', 301),
(3002, 'Girls'' Tops', 301),
(3003, 'Girls'' Bottoms', 301);


INSERT INTO clothing (name, description, price, stock, "brandId", "categoryId") VALUES
('Levi''s 501 Original Fit Jeans', 'Classic straight-leg jeans in durable denim.', 59.99, 100, 1, 202),
('Nike Air Max 90', 'Iconic sneakers with a timeless design.', 129.99, 50, 2, 2001),
('Zara Basic Blouse', 'Simple and elegant blouse for everyday wear.', 39.99, 75, 3, 102),
('Adidas UltraBoost', 'High-performance running shoes with superior comfort.', 180.00, 60, 4, 2001),
('H&M Cotton T-Shirt', 'Soft cotton T-shirt for casual outings.', 12.99, 200, 5, 201),
('Gucci GG Marmont Shoulder Bag', 'Luxury shoulder bag with a classic design.', 1500.00, 10, 6, 101),
('Patagonia Down Sweater', 'Lightweight, windproof, and warm jacket.', 229.00, 30, 7, 204),
('Calvin Klein Slim Fit Suit', 'Modern and stylish slim fit suit.', 450.00, 20, 8, 203),
('Gap Hoodie', 'Comfortable hoodie for everyday wear.', 49.99, 120, 9, 104),
('Old Navy Swim Trunks', 'Quick-dry swim trunks with a comfortable fit.', 25.00, 80, 10, 205),
('Ralph Lauren Polo Shirt', 'Classic polo shirt with the iconic logo.', 85.00, 40, 11, 2003),
('Tommy Hilfiger Oxford Shirt', 'Timeless oxford shirt for formal occasions.', 75.00, 60, 12, 2002),
('Under Armour Performance T-Shirt', 'Moisture-wicking T-shirt for active lifestyles.', 30.00, 90, 13, 2001),
('Uniqlo Ultra Light Down Jacket', 'Compact and warm down jacket.', 69.90, 50, 14, 204),
('Supreme Box Logo Hoodie', 'Iconic hoodie with the Supreme box logo.', 180.00, 25, 15, 104),
('Forever 21 Skinny Jeans', 'Trendy skinny jeans for a sleek look.', 22.99, 150, 16, 103),
('Abercrombie & Fitch Chinos', 'Versatile chinos for casual and formal wear.', 60.00, 70, 17, 202),
('Hollister Graphic Tee', 'Casual graphic tee with a relaxed fit.', 20.00, 110, 18, 201),
('American Eagle Outfitters Cargo Shorts', 'Comfortable cargo shorts with plenty of pockets.', 45.00, 65, 19, 202),
('Victoria''s Secret Lace Bra', 'Elegant lace bra with a comfortable fit.', 55.00, 50, 20, 102),
('Levi''s 721 High Rise Skinny Jeans', 'Figure-enhancing skinny jeans with a high rise.', 89.99, 100, 1, 103),
('Nike Sportswear Club Fleece Hoodie', 'Soft and comfortable fleece hoodie.', 55.00, 75, 2, 104),
('Zara Printed Dress', 'Stylish dress with a unique print.', 59.99, 80, 3, 101),
('Adidas Trefoil T-Shirt', 'Classic T-shirt with the iconic Trefoil logo.', 30.00, 150, 4, 201),
('H&M Denim Jacket', 'Casual denim jacket for a versatile look.', 49.99, 90, 5, 104),
('Gucci Ace Sneakers', 'Luxury sneakers with a timeless design.', 650.00, 15, 6, 2001),
('Patagonia Synchilla Fleece Pullover', 'Warm fleece pullover for outdoor adventures.', 129.00, 40, 7, 204),
('Calvin Klein Wool Coat', 'Elegant wool coat for colder weather.', 320.00, 25, 8, 204),
('Gap Straight Fit Khakis', 'Comfortable khakis with a classic fit.', 44.99, 100, 9, 202),
('Old Navy Flip Flops', 'Affordable and comfortable flip flops.', 4.99, 200, 10, 205),
('Ralph Lauren Cable Knit Sweater', 'Cozy cable knit sweater for a timeless look.', 120.00, 30, 11, 104),
('Tommy Hilfiger Puffer Jacket', 'Warm puffer jacket with a modern design.', 160.00, 50, 12, 204),
('Under Armour HeatGear Leggings', 'Compression leggings for enhanced performance.', 50.00, 70, 13, 103),
('Uniqlo Supima Cotton T-Shirt', 'High-quality cotton T-shirt for everyday wear.', 14.90, 150, 14, 201),
('Supreme Beanie', 'Trendy beanie with the Supreme logo.', 50.00, 60, 15, 104),
('Forever 21 Midi Skirt', 'Chic midi skirt for a stylish outfit.', 25.99, 100, 16, 101),
('Abercrombie & Fitch Denim Shorts', 'Casual denim shorts with a comfortable fit.', 45.00, 80, 17, 103),
('Hollister Plaid Shirt', 'Classic plaid shirt for a laid-back look.', 35.00, 120, 18, 201),
('American Eagle Outfitters Flannel Shirt', 'Cozy flannel shirt for chilly days.', 39.99, 90, 19, 201),
('Victoria''s Secret Silk Robe', 'Luxurious silk robe for a comfortable feel.', 120.00, 20, 20, 101);




-- Ensure the foreign key references are correct and present in your database.
-- User ID: 58cd9f7d-7534-4c75-ba17-4886fe7c47f4
-- Clothing IDs: from 240 to 289

INSERT INTO orderitem (id,"userId", "clothingId", quantity, "orderDate", "shippingAddress", "billingAddress", "orderStatus", "paymentStatus", "paymentMethod", "totalPrice", "taxAmount", "shippingCost", "discountAmount", "trackingNumber", "estimatedDeliveryDate", comments) VALUES
(uuid_generate_v4(),'58cd9f7d-7534-4c75-ba17-4886fe7c47f4', 240, 2, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 100.00, 8.00, 5.00, NULL, 'TRACK12345', NULL, 'First order comment'),
(uuid_generate_v4(),'58cd9f7d-7534-4c75-ba17-4886fe7c47f4', 241, 1, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'ESEWA', 50.00, 4.00, 5.00, NULL, 'TRACK12346', NULL, 'Second order comment'),
(uuid_generate_v4(),'58cd9f7d-7534-4c75-ba17-4886fe7c47f4', 242, 3, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 150.00, 12.00, 5.00, 10.00, 'TRACK12347', NULL, 'Third order comment'),
(uuid_generate_v4(),'58cd9f7d-7534-4c75-ba17-4886fe7c47f4', 243, 4, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 200.00, 16.00, 5.00, 15.00, 'TRACK12348', NULL, 'Fourth order comment'),
(uuid_generate_v4(),'58cd9f7d-7534-4c75-ba17-4886fe7c47f4', 244, 2, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'ESEWA', 100.00, 8.00, 5.00, NULL, 'TRACK12349', NULL, 'Fifth order comment'),
(uuid_generate_v4(),'58cd9f7d-7534-4c75-ba17-4886fe7c47f4', 245, 1, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 60.00, 4.80, 5.00, NULL, 'TRACK12350', NULL, 'Sixth order comment'),
(uuid_generate_v4(),'58cd9f7d-7534-4c75-ba17-4886fe7c47f4', 246, 5, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'ESEWA', 300.00, 24.00, 5.00, 20.00, 'TRACK12351', NULL, 'Seventh order comment'),
(uuid_generate_v4(),'58cd9f7d-7534-4c75-ba17-4886fe7c47f4', 247, 3, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 180.00, 14.40, 5.00, 10.00, 'TRACK12352', NULL, 'Eighth order comment'),
(uuid_generate_v4(),'58cd9f7d-7534-4c75-ba17-4886fe7c47f4', 248, 2, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'ESEWA', 120.00, 9.60, 5.00, NULL, 'TRACK12353', NULL, 'Ninth order comment'),
(uuid_generate_v4(),'58cd9f7d-7534-4c75-ba17-4886fe7c47f4', 249, 4, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 250.00, 20.00, 5.00, 15.00, 'TRACK12354', NULL, 'Tenth order comment'),
(uuid_generate_v4(),'58cd9f7d-7534-4c75-ba17-4886fe7c47f4', 250, 2, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'ESEWA', 100.00, 8.00, 5.00, NULL, 'TRACK12355', NULL, 'Eleventh order comment'),
(uuid_generate_v4(),'58cd9f7d-7534-4c75-ba17-4886fe7c47f4', 251, 1, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 60.00, 4.80, 5.00, NULL, 'TRACK12356', NULL, 'Twelfth order comment'),
(uuid_generate_v4(),'58cd9f7d-7534-4c75-ba17-4886fe7c47f4', 252, 5, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'ESEWA', 300.00, 24.00, 5.00, 20.00, 'TRACK12357', NULL, 'Thirteenth order comment'),
(uuid_generate_v4(),'58cd9f7d-7534-4c75-ba17-4886fe7c47f4', 253, 3, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 180.00, 14.40, 5.00, 10.00, 'TRACK12358', NULL, 'Fourteenth order comment'),
(uuid_generate_v4(),'58cd9f7d-7534-4c75-ba17-4886fe7c47f4', 254, 2, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'ESEWA', 120.00, 9.60, 5.00, NULL, 'TRACK12359', NULL, 'Fifteenth order comment'),
(uuid_generate_v4(),'58cd9f7d-7534-4c75-ba17-4886fe7c47f4', 255, 4, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 250.00, 20.00, 5.00, 15.00, 'TRACK12360', NULL, 'Sixteenth order comment'),
(uuid_generate_v4(),'58cd9f7d-7534-4c75-ba17-4886fe7c47f4', 256, 2, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'ESEWA', 100.00, 8.00, 5.00, NULL, 'TRACK12361', NULL, 'Seventeenth order comment'),
(uuid_generate_v4(),'58cd9f7d-7534-4c75-ba17-4886fe7c47f4', 257, 1, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 60.00, 4.80, 5.00, NULL, 'TRACK12362', NULL, 'Eighteenth order comment'),
(uuid_generate_v4(),'58cd9f7d-7534-4c75-ba17-4886fe7c47f4', 258, 5, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'ESEWA', 300.00, 24.00, 5.00, 20.00, 'TRACK12363', NULL, 'Nineteenth order comment'),
(uuid_generate_v4(),'58cd9f7d-7534-4c75-ba17-4886fe7c47f4', 259, 3, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 180.00, 14.40, 5.00, 10.00, 'TRACK12364', NULL, 'Twentieth order comment'),
(uuid_generate_v4(),'58cd9f7d-7534-4c75-ba17-4886fe7c47f4', 260, 2, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'ESEWA', 100.00, 8.00, 5.00, NULL, 'TRACK12365', NULL, 'Twenty-first order comment'),
(uuid_generate_v4(),'58cd9f7d-7534-4c75-ba17-4886fe7c47f4', 261, 1, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 60.00, 4.80, 5.00, NULL, 'TRACK12366', NULL, 'Twenty-second order comment'),
(uuid_generate_v4(),'58cd9f7d-7534-4c75-ba17-4886fe7c47f4', 262, 5, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'ESEWA', 300.00, 24.00, 5.00, 20.00, 'TRACK12367', NULL, 'Twenty-third order comment'),
(uuid_generate_v4(),'58cd9f7d-7534-4c75-ba17-4886fe7c47f4', 263, 3, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 180.00, 14.40, 5.00, 10.00, 'TRACK12368', NULL, 'Twenty-fourth order comment'),
(uuid_generate_v4(),'58cd9f7d-7534-4c75-ba17-4886fe7c47f4', 264, 2, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'ESEWA', 120.00, 9.60, 5.00, NULL, 'TRACK12369', NULL, 'Twenty-fifth order comment'),
(uuid_generate_v4(),'58cd9f7d-7534-4c75-ba17-4886fe7c47f4', 265, 4, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 250.00, 20.00, 5.00, 15.00, 'TRACK12370', NULL, 'Twenty-sixth order comment'),
(uuid_generate_v4(),'58cd9f7d-7534-4c75-ba17-4886fe7c47f4', 266, 2, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'ESEWA', 100.00, 8.00, 5.00, NULL, 'TRACK12371', NULL, 'Twenty-seventh order comment'),
(uuid_generate_v4(),'58cd9f7d-7534-4c75-ba17-4886fe7c47f4', 267, 1, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 60.00, 4.80, 5.00, NULL, 'TRACK12372', NULL, 'Twenty-eighth order comment'),
(uuid_generate_v4(),'58cd9f7d-7534-4c75-ba17-4886fe7c47f4', 268, 5, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'ESEWA', 300.00, 24.00, 5.00, 20.00, 'TRACK12373', NULL, 'Twenty-ninth order comment'),
(uuid_generate_v4(),'58cd9f7d-7534-4c75-ba17-4886fe7c47f4', 269, 3, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 180.00, 14.40, 5.00, 10.00, 'TRACK12374', NULL, 'Thirtieth order comment'),
(uuid_generate_v4(),'58cd9f7d-7534-4c75-ba17-4886fe7c47f4', 270, 2, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'ESEWA', 100.00, 8.00, 5.00, NULL, 'TRACK12375', NULL, 'Thirty-first order comment'),
(uuid_generate_v4(),'58cd9f7d-7534-4c75-ba17-4886fe7c47f4', 271, 1, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 60.00, 4.80, 5.00, NULL, 'TRACK12376', NULL, 'Thirty-second order comment'),
(uuid_generate_v4(),'58cd9f7d-7534-4c75-ba17-4886fe7c47f4', 272, 5, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'ESEWA', 300.00, 24.00, 5.00, 20.00, 'TRACK12377', NULL, 'Thirty-third order comment'),
(uuid_generate_v4(),'58cd9f7d-7534-4c75-ba17-4886fe7c47f4', 273, 3, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 180.00, 14.40, 5.00, 10.00, 'TRACK12378', NULL, 'Thirty-fourth order comment'),
(uuid_generate_v4(),'58cd9f7d-7534-4c75-ba17-4886fe7c47f4', 274, 2, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'ESEWA', 120.00, 9.60, 5.00, NULL, 'TRACK12379', NULL, 'Thirty-fifth order comment'),
(uuid_generate_v4(),'58cd9f7d-7534-4c75-ba17-4886fe7c47f4', 275, 4, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 250.00, 20.00, 5.00, 15.00, 'TRACK12380', NULL, 'Thirty-sixth order comment'),
(uuid_generate_v4(),'58cd9f7d-7534-4c75-ba17-4886fe7c47f4', 276, 2, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'ESEWA', 100.00, 8.00, 5.00, NULL, 'TRACK12381', NULL, 'Thirty-seventh order comment'),
(uuid_generate_v4(),'58cd9f7d-7534-4c75-ba17-4886fe7c47f4', 277, 1, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 60.00, 4.80, 5.00, NULL, 'TRACK12382', NULL, 'Thirty-eighth order comment'),
(uuid_generate_v4(),'58cd9f7d-7534-4c75-ba17-4886fe7c47f4', 278, 5, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'ESEWA', 300.00, 24.00, 5.00, 20.00, 'TRACK12383', NULL, 'Thirty-ninth order comment'),
(uuid_generate_v4(),'58cd9f7d-7534-4c75-ba17-4886fe7c47f4', 279, 3, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 180.00, 14.40, 5.00, 10.00, 'TRACK12384', NULL, 'Fortieth order comment'),
(uuid_generate_v4(),'58cd9f7d-7534-4c75-ba17-4886fe7c47f4', 280, 2, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'ESEWA', 100.00, 8.00, 5.00, NULL, 'TRACK12385', NULL, 'Forty-first order comment'),
(uuid_generate_v4(),'58cd9f7d-7534-4c75-ba17-4886fe7c47f4', 281, 1, now(), '123 Shipping St.', '456 Billing Blvd.', 'PENDING', 'PENDING', 'CREDIT_CARD', 60.00, 4.80, 5.00, NULL, 'TRACK12386', NULL, 'Forty-second order comment');

