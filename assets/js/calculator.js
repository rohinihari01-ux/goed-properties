/* ==========================================================================
   Goed Properties - Home Loan and Investment Calculators
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const formatINR = value => "₹" + Math.round(Number.isFinite(value) ? value : 0).toLocaleString("en-IN");
    const byId = id => document.getElementById(id);

    // Home loan EMI calculator
    const loan = {
        price: byId("loan-price"),
        down: byId("loan-down"),
        rate: byId("loan-rate"),
        tenure: byId("loan-tenure")
    };

    if (loan.price && loan.down && loan.rate && loan.tenure) {
        const updateLoan = () => {
            const propertyPrice = Number(loan.price.value);
            const maxDownPayment = Math.round(propertyPrice * 0.8);
            loan.down.max = String(maxDownPayment);
            loan.down.value = String(Math.min(Number(loan.down.value), maxDownPayment));

            const downPayment = Number(loan.down.value);
            const principal = Math.max(0, propertyPrice - downPayment);
            const months = Number(loan.tenure.value) * 12;
            const monthlyRate = Number(loan.rate.value) / 1200;
            const monthlyEMI = principal === 0 || months === 0
                ? 0
                : monthlyRate === 0
                    ? principal / months
                    : principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
            const totalPayment = monthlyEMI * months;
            const totalInterest = Math.max(0, totalPayment - principal);
            const principalPercent = totalPayment > 0 ? Math.round(principal / totalPayment * 100) : 0;
            const interestPercent = totalPayment > 0 ? 100 - principalPercent : 0;

            byId("loan-price-value").textContent = formatINR(propertyPrice);
            byId("loan-down-value").textContent = formatINR(downPayment);
            byId("loan-down-percent").textContent = propertyPrice > 0 ? String(Math.round(downPayment / propertyPrice * 100)) : "0";
            byId("loan-down-max-label").textContent = `Max 80%: ${formatINR(maxDownPayment)}`;
            byId("loan-rate-value").textContent = `${Number(loan.rate.value).toFixed(1).replace(/\.0$/, "")}%`;
            byId("loan-tenure-value").textContent = `${loan.tenure.value} Years (${months} Months)`;
            byId("loan-emi").textContent = formatINR(monthlyEMI);
            byId("loan-principal").textContent = formatINR(principal);
            byId("loan-interest").textContent = formatINR(totalInterest);
            byId("loan-total").textContent = formatINR(totalPayment);
            byId("loan-principal-percent").textContent = `${principalPercent}%`;
            byId("loan-interest-percent").textContent = `${interestPercent}%`;
            byId("loan-principal-bar").style.width = `${principalPercent}%`;
            byId("loan-interest-bar").style.width = `${interestPercent}%`;
        };

        Object.values(loan).forEach(input => input.addEventListener("input", updateLoan));
        updateLoan();
    }

    // Property investment forecast and EMI calculator
    const investment = {
        price: byId("investment-price"),
        downPercent: byId("investment-down"),
        rate: byId("investment-rate"),
        tenure: byId("investment-tenure"),
        appreciation: byId("investment-appreciation")
    };

    if (Object.values(investment).every(Boolean)) {
        const updateInvestment = () => {
            const price = Number(investment.price.value);
            const downPercent = Number(investment.downPercent.value);
            const downPayment = price * downPercent / 100;
            const principal = Math.max(0, price - downPayment);
            const annualRate = Math.min(15, Math.max(0, Number(investment.rate.value) || 0));
            investment.rate.value = String(annualRate);
            const years = Number(investment.tenure.value);
            const months = years * 12;
            const monthlyRate = annualRate / 1200;
            const monthlyEMI = months === 0
                ? 0
                : monthlyRate === 0
                    ? principal / months
                    : principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
            const totalInterest = Math.max(0, monthlyEMI * months - principal);
            const appreciation = Number(investment.appreciation.value) / 100;
            const projectedValue = price * Math.pow(1 + appreciation, 5);
            const valueGrowth = projectedValue - price;

            byId("investment-price-value").textContent = formatINR(price);
            byId("investment-down-percent").textContent = String(downPercent);
            byId("investment-down-value").textContent = formatINR(downPayment);
            byId("investment-appreciation-value").textContent = String(investment.appreciation.value);
            byId("investment-emi").innerHTML = `${formatINR(monthlyEMI)} <span class="font-inter text-xs font-normal text-slate-400">/ mo</span>`;
            byId("investment-principal").textContent = formatINR(principal);
            byId("investment-down-result").textContent = formatINR(downPayment);
            byId("investment-interest").textContent = formatINR(totalInterest);
            byId("investment-projected-value").textContent = formatINR(projectedValue);
            byId("investment-gain").textContent = `+${formatINR(valueGrowth)}`;
        };

        investment.price.addEventListener("input", updateInvestment);
        investment.downPercent.addEventListener("input", updateInvestment);
        investment.rate.addEventListener("input", updateInvestment);
        investment.rate.addEventListener("change", updateInvestment);
        investment.tenure.addEventListener("change", updateInvestment);
        investment.appreciation.addEventListener("input", updateInvestment);
        updateInvestment();
    }
});
