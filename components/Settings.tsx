
import React, { useState } from 'react';

const Settings: React.FC = () => {
    const [riskSettings, setRiskSettings] = useState({
        dailyLossLimit: 5,
        positionSizeLimit: 1000,
        riskPerTrade: 1,
    });
    const [notificationSettings, setNotificationSettings] = useState({
        email: 'user@example.com',
        onTrade: true,
        onError: true,
    });

    const handleRiskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRiskSettings({ ...riskSettings, [e.target.name]: e.target.value });
    };

    const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setNotificationSettings({ ...notificationSettings, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSave = () => {
        // In a real app, this would save to a backend
        alert('Settings saved!');
    };

    return (
        <div className="max-w-4xl mx-auto text-slate-200 space-y-12">
            <div>
                <h2 className="text-2xl font-bold border-b border-slate-700 pb-2 mb-6">Risk Management</h2>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <label htmlFor="dailyLossLimit" className="font-medium text-slate-300">Daily Loss Limit (%)</label>
                        <input type="number" name="dailyLossLimit" id="dailyLossLimit" value={riskSettings.dailyLossLimit} onChange={handleRiskChange}
                            className="bg-slate-700 border border-slate-600 rounded-md px-3 py-2 w-full focus:ring-sky-500 focus:border-sky-500" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <label htmlFor="positionSizeLimit" className="font-medium text-slate-300">Max Position Size ($)</label>
                        <input type="number" name="positionSizeLimit" id="positionSizeLimit" value={riskSettings.positionSizeLimit} onChange={handleRiskChange}
                            className="bg-slate-700 border border-slate-600 rounded-md px-3 py-2 w-full focus:ring-sky-500 focus:border-sky-500" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <label htmlFor="riskPerTrade" className="font-medium text-slate-300">Risk Per Trade (%)</label>
                        <input type="number" name="riskPerTrade" id="riskPerTrade" value={riskSettings.riskPerTrade} onChange={handleRiskChange}
                            className="bg-slate-700 border border-slate-600 rounded-md px-3 py-2 w-full focus:ring-sky-500 focus:border-sky-500" />
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold border-b border-slate-700 pb-2 mb-6">Notifications</h2>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <label htmlFor="email" className="font-medium text-slate-300">Notification Email</label>
                        <input type="email" name="email" id="email" value={notificationSettings.email} onChange={handleNotificationChange}
                            className="bg-slate-700 border border-slate-600 rounded-md px-3 py-2 w-full focus:ring-sky-500 focus:border-sky-500" />
                    </div>
                    <div className="flex items-center space-x-4">
                        <input type="checkbox" name="onTrade" id="onTrade" checked={notificationSettings.onTrade} onChange={handleNotificationChange}
                            className="h-4 w-4 rounded border-slate-600 bg-slate-700 text-sky-600 focus:ring-sky-500" />
                        <label htmlFor="onTrade" className="font-medium text-slate-300">Notify on every trade</label>
                    </div>
                    <div className="flex items-center space-x-4">
                        <input type="checkbox" name="onError" id="onError" checked={notificationSettings.onError} onChange={handleNotificationChange}
                            className="h-4 w-4 rounded border-slate-600 bg-slate-700 text-sky-600 focus:ring-sky-500" />
                        <label htmlFor="onError" className="font-medium text-slate-300">Notify on system errors</label>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-6">
                <button onClick={handleSave} className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300">
                    Save Settings
                </button>
            </div>
        </div>
    );
};

export default Settings;
