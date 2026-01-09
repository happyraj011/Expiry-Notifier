'use client';

import { useRef, useState } from 'react';
// @ts-ignore - Quagga doesn't have TypeScript definitions
import Quagga from 'quagga';

interface BarcodeScannerProps {
    onScanSuccess: (barcode: string) => void;
    onScanError?: (error: string) => void;
}

export default function BarcodeScanner({ onScanSuccess, onScanError }: BarcodeScannerProps) {
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string>('');
    const [isCameraActive, setIsCameraActive] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const startCamera = async () => {
        try {
            setError('');
            setCapturedImage(null); // Clear any previous image
            setIsCameraActive(true); // Set this FIRST so UI renders
            
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'environment',
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            });

            // Wait for video ref to be available
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                await videoRef.current.play(); // Explicitly play the video
                streamRef.current = stream;
                console.log('✅ Camera started successfully');
            } else {
                setError('Video element not found');
                setIsCameraActive(false);
            }
        } catch (err: any) {
            console.error('Camera error:', err);
            setError('Failed to access camera: ' + err.message);
            setIsCameraActive(false);
            if (onScanError) {
                onScanError(err.message);
            }
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        setIsCameraActive(false);
    };

    const capturePhoto = () => {
        if (!videoRef.current || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const video = videoRef.current;

        // Set canvas size to video size
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw video frame to canvas
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.drawImage(video, 0, 0);
            const imageData = canvas.toDataURL('image/png');
            setCapturedImage(imageData);
            stopCamera();

            // Decode barcode from image
            decodeBarcode(imageData);
        }
    };

    const decodeBarcode = (imageSrc: string) => {
        setIsProcessing(true);
        setError('');

        Quagga.decodeSingle({
            src: imageSrc,
            numOfWorkers: 0,
            locate: true,
            inputStream: {
                size: 800
            },
            decoder: {
                readers: [
                    "ean_reader",
                    "ean_8_reader",
                    "upc_reader",
                    "upc_e_reader",
                    "code_128_reader",
                    "code_39_reader",
                ]
            },
        }, (result: any) => {
            setIsProcessing(false);

            if (result && result.codeResult) {
                console.log('✅ Barcode detected:', result.codeResult.code);
                onScanSuccess(result.codeResult.code);
            } else {
                setError('No barcode detected in photo. Please try again with better lighting and focus.');
                if (onScanError) {
                    onScanError('No barcode detected');
                }
            }
        });
    };

    const retakePhoto = () => {
        setCapturedImage(null);
        setError('');
        startCamera();
    };

    return (
        <div className="barcode-scanner-container w-full max-w-md mx-auto">
            {/* Camera View */}
            {isCameraActive && !capturedImage && (
                <div className="relative">
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full rounded-lg border-2 border-gray-300"
                        style={{ maxHeight: '400px' }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="border-4 border-green-500 rounded-lg" style={{
                            width: '80%',
                            height: '40%',
                            boxShadow: '0 0 0 9999px rgba(0,0,0,0.5)'
                        }}>
                            <p className="text-white text-xs text-center mt-1 bg-green-500 rounded px-2 py-1">
                                Position barcode here
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Captured Photo */}
            {capturedImage && (
                <div className="relative">
                    <img
                        src={capturedImage}
                        alt="Captured barcode"
                        className="w-full rounded-lg border-2 border-gray-300"
                    />
                    {isProcessing && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                            <div className="text-white text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-2"></div>
                                <p>Scanning barcode...</p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Hidden canvas for capturing */}
            <canvas ref={canvasRef} style={{ display: 'none' }} />

            {error && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    <p className="text-sm font-medium">{error}</p>
                </div>
            )}

            {/* Buttons */}
            <div className="mt-4 flex gap-3 justify-center">
                {!isCameraActive && !capturedImage && (
                    <button
                        onClick={startCamera}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        📷 Open Camera
                    </button>
                )}

                {isCameraActive && !capturedImage && (
                    <>
                        <button
                            onClick={capturePhoto}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                        >
                            📸 Capture Photo
                        </button>
                        <button
                            onClick={stopCamera}
                            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                        >
                            ❌ Cancel
                        </button>
                    </>
                )}

                {capturedImage && !isProcessing && (
                    <button
                        onClick={retakePhoto}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        🔄 Retake Photo
                    </button>
                )}
            </div>

            {/* Instructions */}
            {isCameraActive && !capturedImage && (
                <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800 font-semibold text-center mb-2">
                        📸 Position the barcode in the frame
                    </p>
                    <div className="text-xs text-blue-600 space-y-1">
                        <p>✓ Hold device 15-25 cm from barcode</p>
                        <p>✓ Ensure barcode is well-lit</p>
                        <p>✓ Keep barcode horizontal and flat</p>
                        <p>✓ Wait for clear focus, then tap Capture</p>
                    </div>
                </div>
            )}
        </div>
    );
}
