import React from 'react';
import Image from 'next/image';

function ProductList({ productList, deleteProduct }) {
  return (
    <div>
      {productList.length > 0 ? (
        <ul>
          {productList.slice().reverse().map((product, index) => (
            <div key={index}>
              <div className="text-white py-8 mt-4 sm:m-10 bg-yellow-600 rounded-xl">
                <div className="max-w-6xl mx-auto xs:px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4">
                      <div className="h-[260px] flex justify-center items-center rounded-lg mb-4">
                        <Image
                          className="w-auto h-full rounded-xl object-cover"
                          width={500}
                          height={500}
                          src={`https://adminpenal-backend-ybav.onrender.com/images/${product.productImageUrl}`}
                          alt="Product Image"
                          priority
                        />
                      </div>
                    </div>
                    <div className="md:flex-1 m-4 sm:m-0 px-4">
                      <h2 className="text-2xl font-bold text-white mb-2">{product.productType}</h2>
                      <p className="text-gray-300 text-sm mb-4">
                        {product.productModel}
                      </p>
                      <div className="flex mb-4">
                        <div className="mr-4">
                          <span className="font-bold text-gray-300">Price: </span>
                          <span className="text-gray-300">{product.productPrice} INR</span>
                        </div>
                        <div>
                          <span className="font-bold text-gray-300">Availability: </span>
                          <span className="text-gray-300">{product.productQuantity}</span>
                        </div>
                      </div>
                      <div className="mb-4">
                        <span className="font-bold text-gray-300">Color:</span>
                        <div className="flex items-center mt-2">
                          <button
                            className="w-6 h-6 rounded-full mr-2"
                            style={{ backgroundColor: `${product.productColor}` }}
                          ></button>
                        </div>
                      </div>

                      <div>
                        <span className="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                        <p className="text-gray-100 text-sm mt-2">
                          {product.productDescription}.
                        </p>
                      </div>

                      <button
                        onClick={() => deleteProduct(product._id)} // Use deleteProduct prop
                        className="mt-4 px-4 py-2 bg-red-500 rounded-lg hover:bg-red-300 hover:text-gray-800 text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ul>
      ) : (
        <p className='w-full h-screen flex justify-center items-center text-yellow-500 font-serif'>No products available</p>
      )}
    </div>
  );
}

export default ProductList;
