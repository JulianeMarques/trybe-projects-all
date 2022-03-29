SELECT notes FROM purchase_orders
WHERE notes 
BETWEEN 'Purchase generated based on Order #30'
AND 'Purchase generated based on Order #39';DELETE FROM order_details;