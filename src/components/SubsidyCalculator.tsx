"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';

export default function SubsidyCalculator() {
    const [investment, setInvestment] = useState<number>(1000000); // Default to 10 Lakhs

    const handleInvestmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/,/g, ''); // Remove existing commas
        setInvestment(Number(value) || 0);
    };

    const capitalSubsidy = investment * 0.23;

    // For display purposes, format numbers with Indian currency style
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <Card className="w-full max-w-lg mx-auto my-12 border-deepTeal-900/20 shadow-lg">
            <CardHeader className="bg-deepTeal-900 text-white rounded-t-lg">
                <CardTitle className="text-2xl text-center">RIPS 2024 Homestay Subsidy Calculator</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="investmentAmount" className="text-lg font-medium text-foreground">
                            Your Total Investment Amount (INR)
                        </Label>
                        <Input
                            id="investmentAmount"
                            type="text"
                            value={investment.toLocaleString('en-IN')} // Format with commas
                            onChange={handleInvestmentChange}
                            className="mt-2 text-xl p-4 h-14"
                            placeholder="e.g., 10,00,000"
                        />
                    </div>
                    <div className="bg-terracotta-700/10 p-6 rounded-lg text-center">
                        <p className="text-lg text-deepTeal-900 font-semibold">
                            You are eligible for a Capital Subsidy of:
                        </p>
                        <p className="text-4xl font-bold text-terracotta-700 mt-2">
                            {formatCurrency(capitalSubsidy)}
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                            (23% of your total investment as per RIPS 2024)
                        </p>
                    </div>
                    <p className="text-xs text-center text-muted-foreground pt-4">
                        Disclaimer: This is an illustrative calculation. Final subsidy amount is subject to approval by the Government of Rajasthan. Other incentives may also apply.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
