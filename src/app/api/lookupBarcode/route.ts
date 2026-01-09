import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const barcode = searchParams.get('barcode');

        if (!barcode) {
            return NextResponse.json(
                { error: "Barcode is required" },
                { status: 400 }
            );
        }

        // Fetch product data from OpenFoodFacts API
        const response = await fetch(
            `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`
        );

        if (!response.ok) {
            return NextResponse.json(
                { error: "Failed to fetch product data" },
                { status: response.status }
            );
        }

        const data = await response.json();

        // Check if product was found
        if (data.status === 0) {
            return NextResponse.json(
                {
                    found: false,
                    message: "Product not found in OpenFoodFacts database"
                },
                { status: 404 }
            );
        }

        // Extract relevant product information
        const product = data.product;

        // Map OpenFoodFacts categories to our app categories
        const mapCategory = (categories: string): string => {
            const categoryLower = categories?.toLowerCase() || '';
            if (categoryLower.includes('dairy') || categoryLower.includes('milk') || categoryLower.includes('cheese')) {
                return 'Dairy';
            } else if (categoryLower.includes('meat') || categoryLower.includes('fish') || categoryLower.includes('seafood')) {
                return 'Meat & Seafood';
            } else if (categoryLower.includes('fruit') || categoryLower.includes('vegetable')) {
                return 'Fruits & Vegetables';
            } else if (categoryLower.includes('beverage') || categoryLower.includes('drink')) {
                return 'Beverages';
            } else if (categoryLower.includes('snack') || categoryLower.includes('dessert')) {
                return 'Snacks';
            } else {
                return 'Other';
            }
        };

        const productData = {
            found: true,
            barcode: barcode,
            productName: product.product_name || product.product_name_en || 'Unknown Product',
            brand: product.brands || '',
            category: mapCategory(product.categories || ''),
            imageUrl: product.image_url || product.image_front_url || '',
            // OpenFoodFacts doesn't provide expiry info, so we return null
            defaultExpiryDays: null
        };

        return NextResponse.json(productData, { status: 200 });

    } catch (error) {
        console.error('Error in barcode lookup:', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
