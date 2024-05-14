import { useState, useEffect } from "react";
import { getServerStatus } from "../../services/healthcheck.services";

function Healthcheck() {
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date()); // Current time state
  
    useEffect(() => {
        // Update current time every second
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
  
        // Fetch server status on component mount
        getServerStatus()
            .then((res) => {
                setStatus(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching server status:", error);
                setLoading(false);
            });
  
        // Clear interval on component unmount
        return () => clearInterval(interval);
    }, []);
  
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
            <header className="bg-blue-500 text-white w-full py-4">
                <h1 className="text-3xl font-bold text-center">Server Status</h1>
            </header>
  
            <main className="flex-grow flex justify-center items-center">
                {loading ? (
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : status ? (
                    <div className="p-8 bg-white shadow-md rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4 text-center">
                            Server Details
                        </h2>
                        <div className="flex flex-col items-center">
                            <p className="mb-4">
                                <span className="font-semibold">Server:</span>{" "}
                                {status.success ? (
                                    <span className="text-green-600">Online</span>
                                ) : (
                                    <span className="text-red-600">Offline</span>
                                )}
                            </p>
                            <p className="mb-4">
                                <span className="font-semibold">Status:</span>{" "}
                                {status.message}
                            </p>
                            <p className="mb-4">
                                <span className="font-semibold">Current Time:</span>{" "}
                                {currentTime.toLocaleTimeString()}
                            </p>
                        </div>
                    </div>
                ) : (
                    <p className="text-red-600">Failed to fetch server status.</p>
                )}
            </main>
  
            <footer className="bg-blue-500 text-white w-full py-4 text-center">
                <p>&copy; 2024 uxlivinglab</p>
            </footer>
        </div>
    );
}

export default Healthcheck;
