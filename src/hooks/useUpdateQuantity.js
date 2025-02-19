const useUpdateQuantity = (setCartItems) => {
    const updateQuantity = (menuId, newQuantity) => {
        setCartItems((prevCartItems) => {
          const updatedItems = prevCartItems.map((item) =>
            item.menuId === menuId
          ? { ...item, quantity: newQuantity }
          : item
        );
          console.log(newQuantity)
          return updatedItems;
        });
      };

    return updateQuantity; 
};

export default useUpdateQuantity;