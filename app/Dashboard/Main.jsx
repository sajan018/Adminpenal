import React, { useEffect, useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { TbCircuitMotor } from "react-icons/tb";
import { TiSocialFlickrCircular } from "react-icons/ti";
import globalApi from '../(api)/globalApi';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import ProductList from './Productlist';

function Main() {
    const [productType, setProductType] = useState("");
    const [productModel, setProductModel] = useState("");
    const [productImageFile, setProductImageFile] = useState(null); // Handle file instead of URL
    const [productPrice, setProductPrice] = useState("");
    const [productQuantity, setProductQuantity] = useState("");
    const [productColor, setProductColor] = useState("");
    const [features, setFeatures] = useState([]);
    const [fuelType, setFuelType] = useState("");
    const [condition, setCondition] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [formError, setFormError] = useState("");  // Track form errors

    const [productList, setProductList] = useState([]);
    useEffect(() => {
        globalApi.getAllProduct().then((resp) => {
            setProductList(resp.data);
        }).catch((error) => {
            console.error('Error fetching product list:', error);
        });
    }, []);

    const deleteProduct = async (id) => {
        try {
            await globalApi.deleteProduct(id);
            const updatedProductList = await globalApi.getAllProduct();
            setProductList(updatedProductList.data);
            alert('Product deleted successfully');
        } catch (error) {
            alert('Product not deleted:', error.message);
        }
    };


    const allFeatures = [
        "High Speed",
        "Comfort",
        "Safety",
        "Fuel Efficiency",
        "Luxury Interior",
        "Advanced Safety",
        "Sporty Design",
        "Compact Size",
        "Powerful Engine",
        "Electric Engine",
    ];

    const handleSubmit = () => {
        // Basic validation
        if (
            !productType || !productModel || !productImageFile ||
            !productPrice || !productQuantity || !productColor || !fuelType || !condition || !productDescription
        ) {
            setFormError("All fields are required.");
            return;
        }

        setFormError("");  // Clear any previous errors

        const formData = new FormData();
        formData.append('productType', productType);
        formData.append('productModel', productModel);
        formData.append('productImageFile', productImageFile); // Append the file
        formData.append('productPrice', productPrice);
        formData.append('productQuantity', productQuantity);
        formData.append('productColor', productColor);
        formData.append('fuelType', fuelType);
        formData.append('condition', condition);
        formData.append('productDescription', productDescription);
        formData.append('features', features); // Append the selected features

        globalApi.createProduct(formData).then((resp) => {
            setProductList([...productList, resp.data]);
            setIsDialogOpen(false); // Close dialog on successful submission
            setProductType("");
            setProductModel("");
            setProductImageFile(null); // Reset the file input
            setProductPrice("");
            setProductQuantity("");
            setProductColor("");
            setFuelType("");
            setCondition("");
            setProductDescription("");
            setFeatures([]); // Reset features selection
            alert('Product added successfully');
        }).catch((error) => {
            console.error("Failed to create product:", error.response ? error.response.data : error.message);
        });
    };

    return (
        <div className='max-w-[1400px] mx-auto min-h-screen h-full bg-black text-white w-full'>
            <header className='w-full p-3 bg-gray-800 text-white px-8 flex justify-between items-center'>
                <div className='flex justify-center bg-gray-700 p-2 rounded-lg items-center text-yellow-100 font-semibold font-serif'>
                    <TbCircuitMotor className='text-3xl text-yellow-600' />
                    <TiSocialFlickrCircular className='' />
                    T<TiSocialFlickrCircular className='' />
                    <TbCircuitMotor className='text-3xl text-yellow-600' />ADNESS
                </div>
                <div>
                    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <AlertDialogTrigger>
                            <button className='text-gray-800 font-mono font-semibold flex gap-2 justify-center items-center p-2 bg-yellow-500 rounded-md'>
                                Add new item <FaPlus className='text-white' />
                            </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Product Details</AlertDialogTitle>
                                <AlertDialogDescription className='pt-4'>
                                    <div className='flex flex-col gap-8'>
                                        {formError && (
                                            <div className='text-red-600'>
                                                {formError}
                                            </div>
                                        )}
                                        <div>
                                            <Select value={productType} onValueChange={setProductType}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select product type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Car">Car</SelectItem>
                                                    <SelectItem value="Bike">Bike</SelectItem>
                                                    <SelectItem value="Super Car">Super Car</SelectItem>
                                                    <SelectItem value="Super Bike">Super Bike</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Product Model
                                            </label>
                                            <input
                                                type="text"
                                                value={productModel}
                                                onChange={(e) => setProductModel(e.target.value)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                                placeholder="Product model"
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Product Image
                                            </label>
                                            <input
                                                type="file"
                                                onChange={(e) => setProductImageFile(e.target.files[0])} // Handle file input
                                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Product Price
                                            </label>
                                            <input
                                                type="String"
                                                value={productPrice}
                                                onChange={(e) => setProductPrice(e.target.value)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                                placeholder="Product price"
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Product Quantity
                                            </label>
                                            <input
                                                type="number"
                                                value={productQuantity}
                                                onChange={(e) => setProductQuantity(e.target.value)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                                placeholder="Product quantity"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Select value={productColor} onValueChange={setProductColor}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select product color" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Black">Black</SelectItem>
                                                    <SelectItem value="White">White</SelectItem>
                                                    <SelectItem value="Red">Red</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Select value={condition} onValueChange={setCondition}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Condition" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="New">New</SelectItem>
                                                    <SelectItem value="Used">Used</SelectItem>
                                                    <SelectItem value="Poor">Poor</SelectItem>
                                                    <SelectItem value="Refurbished">Refurbished</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Select value={fuelType} onValueChange={setFuelType}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Fuel type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Petrol">Petrol</SelectItem>
                                                    <SelectItem value="Diesel">Diesel</SelectItem>
                                                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                                                    <SelectItem value="CNG">CNG</SelectItem>
                                                    <SelectItem value="Electric">Electric</SelectItem>
                                                    <SelectItem value="gasoline">gasoline</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Select Features
                                            </label>
                                            <div className="flex flex-wrap gap-2">
                                                {allFeatures.map((feature) => (
                                                    <label key={feature} className="flex items-center space-x-2">
                                                        <input
                                                            type="checkbox"
                                                            value={feature}
                                                            checked={features.includes(feature)}
                                                            onChange={(e) => {
                                                                const selectedFeature = e.target.value;
                                                                setFeatures((prevFeatures) =>
                                                                    prevFeatures.includes(selectedFeature)
                                                                        ? prevFeatures.filter((f) => f !== selectedFeature)
                                                                        : [...prevFeatures, selectedFeature]
                                                                );
                                                            }}
                                                            className="form-checkbox"
                                                        />
                                                        <span>{feature}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <textarea
                                                value={productDescription}
                                                onChange={(e) => setProductDescription(e.target.value)}
                                                rows={5}
                                                className='w-full p-3 border border-gray-500'
                                                placeholder="Product description"
                                            />
                                        </div>
                                    </div>
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleSubmit}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </header>
            <ProductList productList={productList} deleteProduct={deleteProduct} />

        </div>
    );
}

export default Main;
