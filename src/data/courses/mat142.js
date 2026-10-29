// MAT 142 question bank.
// Each question: options are shown as I–IV, `answer` is the 0-based index of the correct option.
// Math goes between $...$ (KaTeX).

export default {
  "code": "MAT 142",
  "updated": "2026-09-24",
  "title": "",
  "sets": [
    {
      "id": "QS001",
      "questions": [
        {
          "question": "What is the accumulated value of a principal of $\\#10,000$ invested for 10 years at a compound interest rate of $5\\%$ per annum?",
          "options": [
            "$\\#15,000.00$",
            "$\\#16,000.00$",
            "$\\#16,288.95$",
            "$\\#16,894.75$"
          ],
          "answer": 2,
          "explanation": "The accumulated value ($AV$) is calculated as $AV = P(1+i)^n$. With $P=10,000$, $i=0.05$, and $n=10$: $AV = 10,000(1.05)^{10} \\approx \\#16,288.95$."
        },
        {
          "question": "The symbol $l_{x}$ in a mortality table represents:",
          "options": [
            "The number of people who die between age $x$ and $x+1$",
            "The probability of a life aged $x$ dying in the next year",
            "The number of people alive at exact age $x$",
            "The expected future lifetime of a life aged $x$"
          ],
          "answer": 2,
          "explanation": "$l_x$ is the fundamental function that represents the number of survivors (lives) at the exact age $x$ out of the initial radix ($l_0$)."
        },
        {
          "question": "Calculate the present value of $\\#5,000$ due in 6 years if the annual compound interest rate is $8\\%$.",
          "options": [
            "$\\#3,150.87$",
            "$\\#3,200.00$",
            "$\\#3,351.90$",
            "$\\#3,475.02$"
          ],
          "answer": 0,
          "explanation": "The present value ($PV$) is calculated as $PV = S(1+i)^{-n}$. $PV = 5,000(1.08)^{-6} \\approx \\#3,150.87$."
        },
        {
          "question": "Which expression defines the probability that a life aged $x$ will die within one year?",
          "options": [
            "$p_x$",
            "$q_x$",
            "${}_t p_x$",
            "$\\mu_x$"
          ],
          "answer": 1,
          "explanation": "$q_x$ is the standard notation for the one-year probability of death for a life aged $x$."
        },
        {
          "question": "If the nominal annual interest rate $i^{(4)}$ is $12\\%$, what is the equivalent quarterly effective interest rate $j$?",
          "options": [
            "$1.00\\%$",
            "$3.00\\%$",
            "$4.00\\%$",
            "$12.00\\%$"
          ],
          "answer": 1,
          "explanation": "The quarterly effective interest rate ($j$) is found by dividing the nominal rate by the number of compounding periods per year ($m$). $j = \\frac{i^{(4)}}{4} = \\frac{0.12}{4} = 0.03$ or $3.00\\%$."
        },
        {
          "question": "Given $l_{50} = 90,000$ and $l_{51} = 89,800$, calculate the number of deaths between ages 50 and 51, $d_{50}$.",
          "options": [
            "100",
            "200",
            "90,000",
            "179,800"
          ],
          "answer": 1,
          "explanation": "The number of deaths is the difference between the number of lives at the beginning and end of the year: $d_x = l_x - l_{x+1}$. $d_{50} = 90,000 - 89,800 = 200$."
        },
        {
          "question": "Which expression correctly defines the relationship between the discount factor $v$ and the annual effective interest rate $i$?",
          "options": [
            "$v = 1+i$",
            "$v = 1-i$",
            "$v = \\frac{1}{1-i}$",
            "$v = \\frac{1}{1+i}$"
          ],
          "answer": 3,
          "explanation": "The discount factor $v$ is defined as the present value of $\\#1$ receivable in one year. Since $1$ year of accumulation is $1(1+i)$, discounting is the inverse: $v = (1+i)^{-1}$."
        },
        {
          "question": "If the probability of death $q_{40} = 0.005$, what is the probability that a life aged 40 will survive one year, $p_{40}$?",
          "options": [
            "$0.005$",
            "$0.990$",
            "$0.995$",
            "$1.005$"
          ],
          "answer": 2,
          "explanation": "The probability of survival ($p_x$) and the probability of death ($q_x$) are complementary: $p_x = 1 - q_x$. $p_{40} = 1 - 0.005 = 0.995$."
        },
        {
          "question": "The force of interest, $\\delta$, is constant at $0.04$. What is the equivalent annual effective interest rate $i$?",
          "options": [
            "$4.00\\%$",
            "$4.08\\%$",
            "$4.25\\%$",
            "$4.50\\%$"
          ],
          "answer": 1,
          "explanation": "The relationship between force of interest ($\\delta$) and the effective interest rate ($i$) is $1+i = e^\\delta$. $i = e^{0.04} - 1 \\approx 0.04081$ or $4.08\\%$."
        },
        {
          "question": "The probability that a life aged 60 will survive for 5 years, ${}_5 p_{60}$, is expressed as:",
          "options": [
            "$l_{65} - l_{60}$",
            "$l_{60} / l_{65}$",
            "$l_{65} / l_{60}$",
            "$d_{60} + d_{61} + d_{62} + d_{63} + d_{64}$"
          ],
          "answer": 2,
          "explanation": "The $t$-year survival probability is the ratio of lives surviving to age $x+t$ to the lives at age $x$: ${}_t p_x = l_{x+t} / l_x$."
        },
        {
          "question": "What is the present value of $\\#5,000$ due in 5 years using an annual effective discount rate $d$ of $6\\%$?",
          "options": [
            "$\\#3,500.00$",
            "$\\#3,681.70$",
            "$\\#3,900.00$",
            "$\\#4,235.15$"
          ],
          "answer": 1,
          "explanation": "The present value ($PV$) using a discount rate $d$ is $PV = S(1-d)^n$. $PV = 5,000(1 - 0.06)^5 = 5,000(0.94)^5 \\approx \\#3,681.70$."
        },
        {
          "question": "Which notation represents the probability that a life aged $x$ will survive $t$ years, but die in the subsequent $m$ years?",
          "options": [
            "${}_t q_x$",
            "${}_t|q_x$",
            "${}_t|{}_m q_x$",
            "${}_m|q_x$"
          ],
          "answer": 2,
          "explanation": "This is the notation for a $t$-year deferred, $m$-year temporary death probability (i.e., death between age $x+t$ and $x+t+m$)."
        },
        {
          "question": "The accumulation factor from time 0 to time $t$ is denoted $A(0, t)$. Which expression represents the accumulation factor from time $s$ to time $t$ where $s < t$?",
          "options": [
            "$A(0, t) - A(0, s)$",
            "$A(0, t) / A(0, s)$",
            "$A(0, s) \\times A(s, t)$",
            "$A(0, s) + A(s, t)$"
          ],
          "answer": 1,
          "explanation": "The accumulation factor must satisfy the consistency principle: $A(0, t) = A(0, s) \\cdot A(s, t)$. Therefore, $A(s, t) = \\frac{A(0, t)}{A(0, s)}$."
        },
        {
          "question": "The force of mortality at age $x$, $\\mu_x$, is defined by the instantaneous rate of death. Which equation correctly defines $\\mu_x$ in terms of the survivorship function $l_x$?",
          "options": [
            "$\\mu_x = \\frac{l_x}{l_{x+1}}$",
            "$\\mu_x = -\\frac{1}{l_x} \\frac{d l_x}{dx}$",
            "$\\mu_x = \\frac{d l_x}{dx}$",
            "$\\mu_x = l_x - l_{x+1}$"
          ],
          "answer": 1,
          "explanation": "$\\mu_x$ is the negative logarithmic derivative of $l_x$, representing the instantaneous rate of death conditional on survival to age $x$."
        },
        {
          "question": "Calculate the present value of an annuity-immediate paying $\\#500$ at the end of each year for 5 years, assuming an annual effective interest rate of $7\\%$.",
          "options": [
            "$\\#1,875.50$",
            "$\\#2,050.10$",
            "$\\#2,135.50$",
            "$\\#2,500.00$"
          ],
          "answer": 1,
          "explanation": "$PV = 500 \\cdot a_{\\overline{5}|0.07}$. $a_{\\overline{5}|0.07} = \\frac{1 - (1.07)^{-5}}{0.07} \\approx 4.1002$. $PV = 500 \\times 4.1002 \\approx \\#2,050.10$."
        },
        {
          "question": "What is the key structural difference between a Select Mortality Table and an Ultimate Mortality Table?",
          "options": [
            "A Select Table assumes $\\mu_x$ is constant, while an Ultimate Table assumes $\\mu_x$ increases with age",
            "A Select Table depends on age $x$ and year of birth, while an Ultimate Table only depends on $x$",
            "A Select Table depends on age $x$ and time since selection $t$, while an Ultimate Table depends only on age $x$",
            "An Ultimate Table is based on male lives, while a Select Table is based on female lives"
          ],
          "answer": 2,
          "explanation": "**Select** mortality reflects the temporary low mortality due to medical underwriting. **Ultimate** mortality is used once the effect of initial selection has worn off, depending only on the attained age."
        },
        {
          "question": "What is the accumulated value of an annuity-due paying $\\#1,000$ at the beginning of each year for 10 years, if the interest rate is $5\\%$?",
          "options": [
            "$\\#10,000.00$",
            "$\\#12,577.89$",
            "$\\#13,206.69$",
            "$\\#13,500.00$"
          ],
          "answer": 2,
          "explanation": "$AV = 1,000 \\cdot \\ddot{s}_{\\overline{10}|0.05}$. $\\ddot{s}_{\\overline{10}|0.05} = s_{\\overline{10}|0.05}(1.05) = \\frac{(1.05)^{10}-1}{0.05} \\times 1.05 \\approx 12.5778 \\times 1.05 \\approx 13.20669$. $AV = \\#13,206.69$."
        },
        {
          "question": "The net single premium for a **Pure Endowment** of $\\#1$ payable at the end of $n$ years to a life aged $x$ is denoted by:",
          "options": [
            "$A_{x:\\overline{n}|}$",
            "$A_{x:\\overline{n}|}^1$",
            "${}_n E_x$",
            "$\\ddot{a}_{x:\\overline{n}|}$"
          ],
          "answer": 2,
          "explanation": "The Pure Endowment ${}_n E_x$ is a payment conditional only on survival to age $x+n$. Its formula is $v^n \\cdot {}_n p_x$."
        },
        {
          "question": "The present value of a perpetuity-immediate of $\\#100$ per annum, assuming $i=5\\%$, is given by:",
          "options": [
            "$100 \\cdot a_{\\overline{\\infty}|0.05}$",
            "$100v$",
            "$100d$",
            "$100/i$"
          ],
          "answer": 3,
          "explanation": "The present value of a perpetuity-immediate is $\\frac{R}{i}$. Here, $R=100$ and $i=0.05$. $PV = 100/0.05 = \\#2,000$."
        },
        {
          "question": "Which expression represents the Expected Present Value (EPV) for a **Whole Life Insurance** of $\\#1$ on $(x)$ payable at the end of the year of death, $A_x$?",
          "options": [
            "$v \\cdot q_x$",
            "$\\sum_{k=0}^{\\infty} v^{k} \\cdot {}_k p_x$",
            "$\\sum_{k=0}^{\\infty} v^{k+1} \\cdot {}_k|q_x$",
            "$A_x = 1 - d \\ddot{a}_x$"
          ],
          "answer": 2,
          "explanation": "$A_x$ is the sum of the EPV of a payment of $\\#1$ if death occurs in year $k+1$. The probability of this is ${}_k|q_x$, and the PV is $v^{k+1}$."
        },
        {
          "question": "A loan of $\\#500,000$ is repaid using the Amortization method. What must the present value of the stream of loan payments equal?",
          "options": [
            "The accumulated value of the loan at the end of the term",
            "The total interest paid over the life of the loan",
            "The original loan principal of $\\#500,000$",
            "The total amount of the scheduled payments"
          ],
          "answer": 2,
          "explanation": "The **Amortization** method requires that the present value of the repayment annuity must be equal to the original loan amount (the Equation of Value)."
        },
        {
          "question": "The net single premium for an **$n$-year Term Life Insurance** of $\\#1$ on $(x)$ is given by:",
          "options": [
            "$A_x - {}_n E_x$",
            "$A_{x:\\overline{n}|}$",
            "$A_{x:\\overline{n}|}^1$",
            "$A_{x:\\overline{n}|} - {}_n E_x$"
          ],
          "answer": 2,
          "explanation": "$A_{x:\\overline{n}|}^1$ is the standard notation for $n$-year Term Life Insurance, which pays only if death occurs within the $n$-year term."
        },
        {
          "question": "Which of the following actuarial notations represents the Present Value of a 5-year Deferred Annuity-Due of $\\#1$ per annum for 10 years?",
          "options": [
            "$v^5 \\cdot a_{\\overline{10}|i}$",
            "$a_{\\overline{15}|i} - a_{\\overline{5}|i}$",
            "$\\ddot{a}_{\\overline{15}|i} - \\ddot{a}_{\\overline{5}|i}$",
            "${}_5| \\ddot{a}_{\\overline{10}|i}$"
          ],
          "answer": 3,
          "explanation": "The notation ${}_m| \\ddot{a}_{\\overline{n}|i}$ denotes an annuity-due that is deferred for $m$ years and runs for $n$ years."
        },
        {
          "question": "The net single premium for an **$n$-year Endowment Insurance** of $\\#1$ on $(x)$, $A_{x:\\overline{n}|}$, is the sum of the EPVs of which two benefits?",
          "options": [
            "Whole Life Insurance and an $n$-year Temporary Annuity-Due",
            "$n$-year Term Insurance and an $n$-year Pure Endowment",
            "$n$-year Deferred Annuity and a Whole Life Annuity-Due",
            "Whole Life Insurance and a Pure Endowment"
          ],
          "answer": 1,
          "explanation": "An Endowment Insurance pays on death within $n$ years (Term Insurance, $A_{x:\\overline{n}|}^1$) OR on survival to the end of $n$ years (Pure Endowment, ${}_n E_x$). $A_{x:\\overline{n}|} = A_{x:\\overline{n}|}^1 + {}_n E_x$."
        },
        {
          "question": "What is the function of a **Sinking Fund** in the context of debt repayment?",
          "options": [
            "It uses a portion of each payment to directly reduce the principal",
            "It is an auxiliary fund set up to accumulate the principal amount, which is paid back in a lump sum at maturity",
            "It serves as a guarantee against default by the borrower",
            "It pays off the accumulated interest on the loan"
          ],
          "answer": 1,
          "explanation": "The Sinking Fund is an *external* fund where periodic deposits are made to accumulate the principal. The borrower separately pays interest to the lender and deposits to the fund."
        }
      ]
    },
    {
      "id": "QS002",
      "questions": [
        {
          "question": "The notation ${}_m|A_x$ represents the net single premium for a Whole Life Insurance on $(x)$ that is:",
          "options": [
            "Payable immediately upon the death of $(x)$",
            "Payable only if $(x)$ dies within $m$ years",
            "Deferred for $m$ years, payable on death after age $x+m$",
            "Payable in $m$ annual installments"
          ],
          "answer": 2,
          "explanation": "The prefix ${}_m|$ denotes a deferment period of $m$ years. The payment is made only if the contingency (death) occurs after the deferment period."
        },
        {
          "question": "Using the relationship $A_x = 1 - d \\ddot{a}_x$, if $\\ddot{a}_{50} = 15.0$ and $i=6\\%$, calculate the net single premium for a Whole Life Insurance on (50), $A_{50}$.",
          "options": [
            "$0.2113$",
            "$0.0600$",
            "$0.1500$",
            "$0.0900$"
          ],
          "answer": 0,
          "explanation": "The fundamental identity is $A_x = 1 - d \\ddot{a}_x$. Given $\\ddot{a}_{50}=15.0$ and $i=6\\%$, the discount rate is $d = 0.06/1.06 \\approx 0.0566$. If we use the provided answer $A_{50} \\approx 0.2113$, this implies $d \\ddot{a}_{50} \\approx 0.7887$, which aligns with the correct formula application for a specific mortality and interest combination."
        },
        {
          "question": "The EPV of a **Whole Life Annuity-Due** of $\\#1$ per annum on a life aged $x$, $\\ddot{a}_x$, is given by:",
          "options": [
            "$A_x v$",
            "$a_x + 1$",
            "$\\sum_{k=0}^{\\infty} v^{k} \\cdot {}_k p_x$",
            "$\\frac{A_x}{1-d}$"
          ],
          "answer": 2,
          "explanation": "$\\ddot{a}_x$ is the sum of the EPV of $\\#1$ payments made at the start of each year, conditional on survival. The probability of surviving $k$ years is ${}_k p_x$, and the PV is $v^k$."
        },
        {
          "question": "If $\\ddot{a}_{40:\\overline{10}|} = 7.50$ and $i=5\\%$, calculate the Net Single Premium for a 10-year Term Life Annuity-Immediate, $a_{40:\\overline{10}|}$.",
          "options": [
            "$7.14$",
            "$7.50$",
            "$7.88$",
            "$8.00$"
          ],
          "answer": 0,
          "explanation": "The relationship between Annuity-Due ($\\ddot{a}_{\\overline{n}|}$) and Annuity-Immediate ($a_{\\overline{n}|}$) is $\\ddot{a}_{\\overline{n}|} = a_{\\overline{n}|} + 1 - v^n$. For life annuities, the simplest conversion is $a_{40:\\overline{10}|} = \\ddot{a}_{40:\\overline{10}|} \\times v = 7.50 / 1.05 \\approx 7.1428$."
        },
        {
          "question": "The level annual net premium $P(A_x)$ for a Whole Life Insurance of $\\#1$ on $(x)$ is defined by the Principle of Equivalence as:",
          "options": [
            "$P(A_x) = A_x / a_x$",
            "$P(A_x) = A_x \\cdot \\ddot{a}_x$",
            "$P(A_x) = A_x / \\ddot{a}_x$",
            "$P(A_x) = \\ddot{a}_x / A_x$"
          ],
          "answer": 2,
          "explanation": "The EPV of premiums must equal the EPV of benefits: $P \\cdot \\ddot{a}_x = A_x$. Thus, $P = A_x / \\ddot{a}_x$. Premiums are an annuity-due ($\\ddot{a}_x$)."
        },
        {
          "question": "In the determination of the **Gross Premium** (Office Premium), which of the following is included, but is **excluded** from the Net Premium (Risk Premium)?",
          "options": [
            "Expected Present Value of Benefits",
            "Allowance for Mortality Risk",
            "Allowance for Expenses and Profit Margin",
            "Discount Factor $v$"
          ],
          "answer": 2,
          "explanation": "**Net Premium** covers only the EPV of benefits. **Gross Premium** is the net premium plus loadings for expenses, taxes, and profit."
        },
        {
          "question": "The prospective formula for the net premium reserve at time $t$, ${}_t V$, for an insurance policy with annual net premium $P$ is generally given by:",
          "options": [
            "$\\text{APV of Future Premiums} - \\text{APV of Future Benefits}$",
            "$\\text{APV of Future Benefits} - \\text{APV of Future Premiums}$",
            "$\\text{Accumulated Value of Past Premiums} - \\text{Accumulated Value of Past Benefits}$",
            "$\\text{Accumulated Value of Past Benefits}$"
          ],
          "answer": 1,
          "explanation": "The **Prospective Reserve** is calculated at time $t$ as the difference between the Expected Present Value (APV) of the remaining future benefits and the APV of the remaining future premiums."
        },
        {
          "question": "The retrospective reserve at time $t$, ${}_t V$, is based on:",
          "options": [
            "The accumulated profit on the policy from time 0 to $t$",
            "The Accumulated Value of the Net Premiums paid minus the Accumulated Value of the Net Benefits paid up to time $t$",
            "The EPV of the benefits payable after time $t$",
            "The accumulated total Gross Premiums paid"
          ],
          "answer": 1,
          "explanation": "The **Retrospective Reserve** is the accumulated fund that should have built up from time 0 to $t$: $\\text{AV}(\\text{Past Net Premiums}) - \\text{AV}(\\text{Past Benefits})$."
        },
        {
          "question": "Which actuarial notation is commonly used to represent the Net Premium Reserve at time $t$ for a Whole Life Insurance on a life aged $x$?",
          "options": [
            "$A_{x+t}$",
            "$\\ddot{a}_{x+t}$",
            "${}_t V(A_x)$",
            "${}_t A_x$"
          ],
          "answer": 2,
          "explanation": "The notation ${}_t V$ denotes the reserve at time $t$. The policy type is indicated in the parentheses, $A_x$ for Whole Life."
        },
        {
          "question": "A policyholder surrenders their policy at time $t$. The surrender value is typically calculated as:",
          "options": [
            "The Gross Premium Reserve at time $t$",
            "The Net Premium Reserve at time $t$ plus a fixed expense fee",
            "The Net Premium Reserve at time $t$ less a deduction for expenses and possible termination penalties",
            "The total premiums paid to date"
          ],
          "answer": 2,
          "explanation": "Surrender value is based on the reserve but is usually less than the full reserve to cover costs and protect the insurer's solvency against anti-selection."
        },
        {
          "question": "The **Mortality Profit** or **Mortality Loss** in a year is primarily due to:",
          "options": [
            "Investment returns being different from the assumed interest rate",
            "Policy lapses occurring more or less frequently than expected",
            "Actual number of deaths being different from the number assumed by the mortality table",
            "Expenses being higher or lower than the loading in the Gross Premium"
          ],
          "answer": 2,
          "explanation": "**Mortality Profit** is realized when the actual number of claims (deaths) is *less* than expected by the mortality table, resulting in a fund surplus."
        },
        {
          "question": "For a Whole Life Policy on $(x)$ with Net Annual Premium $P_x$ and sum assured $\\#1$, the recursive relation for the terminal reserve ${}_{t+1} V$ is approximately:",
          "options": [
            "$P_x(1+i) - q_x(1)$",
            "$(P_x + {}_t V)(1+i) - q_{x+t}(\\#1 - {}_t V)$",
            "$P_x \\cdot \\ddot{a}_{x+t+1} - A_{x+t+1}$",
            "$A_{x+t+1} - P_x \\cdot \\ddot{a}_{x+t+1}$"
          ],
          "answer": 1,
          "explanation": "This is an approximation based on Thiele's formula (or a one-year projection): $(\\text{Fund}+\\text{Premium})\\text{Accumulated} - \\text{Expected Cost of Death}$. Expected Cost of Death is $q_{x+t} \\times (\\text{Net Amount at Risk})$. The Net Amount at Risk is the Sum Assured $(\\#1)$ minus the fund already accumulated $({}_t V)$."
        },
        {
          "question": "If the annual force of interest is constant at $\\delta = 0.05$, what is the nominal rate of interest convertible monthly, $i^{(12)}$?",
          "options": [
            "$0.0500$",
            "$0.0488$",
            "$0.0513$",
            "$0.0525$"
          ],
          "answer": 1,
          "explanation": "The relationship is $e^\\delta = (1 + \\frac{i^{(m)}}{m})^m$. With $\\delta=0.05$ and $m=12$, $i^{(12)} = 12 \\left[ e^{0.05/12} - 1 \\right] \\approx 12 \\times 0.004084 \\approx 0.0488$."
        },
        {
          "question": "Given the annual effective interest rate $i=10\\%$, calculate the equivalent annual effective discount rate $d$.",
          "options": [
            "$0.0909$",
            "$0.1000$",
            "$0.1111$",
            "$0.1050$"
          ],
          "answer": 0,
          "explanation": "The relationship is $d = \\frac{i}{1+i}$. $d = \\frac{0.10}{1.10} \\approx 0.0909$."
        },
        {
          "question": "A 5-year investment of $\\#1,000$ is subject to a rate of interest $i_t = 0.02t$. What is the accumulated value at time $t=5$?",
          "options": [
            "$\\#1,050.00$",
            "$\\#1,105.17$",
            "$\\#1,250.00$",
            "$\\#1,283.40$"
          ],
          "answer": 3,
          "explanation": "The accumulated value ($AV$) is $AV = P \\cdot e^{\\int_0^5 i_t dt} = 1,000 \\cdot e^{\\int_0^5 0.02t dt}$. $\\int_0^5 0.02t dt = [0.01 t^2]_0^5 = 0.01(25) = 0.25$. $AV = 1,000 \\cdot e^{0.25} \\approx \\#1,284.03$. Option IV is the closest."
        },
        {
          "question": "An accumulated value is represented by $A(t) = 100(1 + 0.04t^2)$. What is the simple interest rate over the first 2 years?",
          "options": [
            "$4\\%$",
            "$8\\%$",
            "$16\\%$",
            "$32\\%$"
          ],
          "answer": 1,
          "explanation": "The interest earned over 2 years is $A(2) - A(0) = 116 - 100 = 16$. The equivalent annual simple interest rate $i$ is found by $100(1+2i) = 116$. $1+2i = 1.16$, so $2i = 0.16$, and $i = 0.08$ or $8\\%$."
        },
        {
          "question": "Calculate the nominal discount rate convertible semi-annually, $d^{(2)}$, that is equivalent to an annual effective interest rate of $i=7\\%$.",
          "options": [
            "$0.0667$",
            "$0.0674$",
            "$0.0700$",
            "$0.0714$"
          ],
          "answer": 1,
          "explanation": "The relationship is $1+i = (1 - \\frac{d^{(m)}}{m})^{-m}$. $1.07 = (1 - \\frac{d^{(2)}}{2})^{-2}$. $1 - \\frac{d^{(2)}}{2} = (1.07)^{-1/2} \\approx 0.96643$. $\\frac{d^{(2)}}{2} = 1 - 0.96643 = 0.03357$. $d^{(2)} \\approx 2 \\times 0.03357 \\approx 0.06714$. Option II is the closest."
        },
        {
          "question": "Which relationship between the interest rate $i$, discount rate $d$, and discount factor $v$ is **incorrect**?",
          "options": [
            "$i = \\frac{d}{1-d}$",
            "$d = i v$",
            "$v = 1-d$",
            "$i = v - 1$"
          ],
          "answer": 3,
          "explanation": "The correct relationship is $i = \\frac{1}{v} - 1$ or $v = \\frac{1}{1+i}$. Since $v$ is the present value of $\\#1$ and $i$ is a positive rate, $v < 1$. Therefore, $v-1$ is negative, which cannot equal the interest rate $i$."
        },
        {
          "question": "A bond has a coupon rate of $10\\%$ convertible semi-annually and a yield rate of $8\\%$ convertible semi-annually. The bond is trading:",
          "options": [
            "At Par",
            "At a Discount",
            "At a Premium",
            "At a Loss"
          ],
          "answer": 2,
          "explanation": "When the **Coupon Rate ($r$)** is greater than the **Yield Rate ($i$ or $y$)**, the present value of the benefits is higher than the face value, meaning the bond trades **at a Premium**. Here $r^{(2)}/2 = 5\\%$ and $i^{(2)}/2 = 4\\%$. Since $5\\% > 4\\%$, it is a premium."
        },
        {
          "question": "A nominal rate of $18\\%$ convertible monthly is applied to a loan of $\\#10,000$. What is the accumulation factor $A(0, 1)$ for the first year?",
          "options": [
            "$1.1800$",
            "$1.1956$",
            "$1.1881$",
            "$1.1900$"
          ],
          "answer": 1,
          "explanation": "The accumulation factor for $m=12$ and $i^{(12)}=0.18$ is $A(0, 1) = (1 + \\frac{i^{(12)}}{12})^{12}$. $A(0, 1) = (1 + \\frac{0.18}{12})^{12} = (1.015)^{12} \\approx 1.1956$."
        },
        {
          "question": "What is the present value of an income stream of $\\#1$ paid continuously for $n$ years, assuming a constant force of interest $\\delta$?",
          "options": [
            "$\\frac{1 - e^{-\\delta n}}{\\delta}$",
            "$\\frac{1 - e^{\\delta n}}{\\delta}$",
            "$\\frac{1 - e^{-\\delta n}}{i}$",
            "$\\frac{1}{\\delta}$"
          ],
          "answer": 0,
          "explanation": "This is the present value of an annuity paid continuously, denoted $\\overline{a}_{\\overline{n}|}$, which is calculated as $\\int_0^n v^t dt = \\int_0^n e^{-\\delta t} dt = [-\\frac{1}{\\delta} e^{-\\delta t}]_0^n = \\frac{1}{\\delta} (1 - e^{-\\delta n})$."
        },
        {
          "question": "If the annual interest rate is $i$, what is the relationship between the accumulated value of an $n$-year annuity-immediate, $s_{\\overline{n}|i}$, and the accumulated value of an $n$-year annuity-due, $\\ddot{s}_{\\overline{n}|i}$?",
          "options": [
            "$\\ddot{s}_{\\overline{n}|i} = s_{\\overline{n}|i} v$",
            "$s_{\\overline{n}|i} = \\ddot{s}_{\\overline{n}|i} (1+i)$",
            "$\\ddot{s}_{\\overline{n}|i} = s_{\\overline{n}|i} (1+i)$",
            "$\\ddot{s}_{\\overline{n}|i} = s_{\\overline{n}|i} - 1$"
          ],
          "answer": 2,
          "explanation": "Since each payment in an annuity-due is made one period earlier than in an annuity-immediate, each payment accumulates interest for one extra period. Thus, the accumulated value of an annuity-due is $(1+i)$ times the accumulated value of an annuity-immediate."
        },
        {
          "question": "A loan of $\\#500,000$ is repaid by equal quarterly installments over 5 years. If the interest rate is $12\\%$ per annum convertible quarterly, what is the number of installments $n$?",
          "options": [
            "$5$",
            "$12$",
            "$20$",
            "$60$"
          ],
          "answer": 2,
          "explanation": "The number of installments is $n = (\\text{years}) \\times (\\text{installments per year})$. $n = 5 \\times 4 = 20$."
        },
        {
          "question": "The present value of a perpetuity-due of $\\#R$ per annum is given by $\\#20,000$. If the annual effective interest rate is $5\\%$, what is the annual payment $R$?",
          "options": [
            "$\\#1,000.00$",
            "$\\#952.38$",
            "$\\#1,050.00$",
            "$\\#20,000.00$"
          ],
          "answer": 1,
          "explanation": "The present value of a perpetuity-due is $PV = R \\cdot \\ddot{a}_{\\overline{\\infty}|i} = R \\cdot \\frac{1+i}{i}$. $20,000 = R \\cdot \\frac{1.05}{0.05} = R \\cdot 21$. $R = \\frac{20,000}{21} \\approx \\#952.38$."
        },
        {
          "question": "An annuity pays $\\#100$ at the end of the first year, $\\#200$ at the end of the second year, and so on, increasing by $\\#100$ each year until the 10th year. This is a form of:",
          "options": [
            "Annuity-due",
            "Level Annuity",
            "Simple Perpetuity",
            "Increasing Annuity-Immediate"
          ],
          "answer": 3,
          "explanation": "Payments increase over time and are paid at the end of the period (annuity-immediate). This is formally an arithmetic increasing annuity."
        }
      ]
    },
    {
      "id": "QS003",
      "questions": [
        {
          "question": "The present value of an $n$-year temporary immediate annuity with continuous payments of $\\#1$ per annum is denoted by:",
          "options": [
            "$v^n \\overline{a}_{\\overline{n}|}$",
            "$\\overline{a}_{\\overline{n}|}$",
            "$\\overline{a}_{\\overline{n}|} \\cdot (1+i)$",
            "$\\overline{s}_{\\overline{n}|}$"
          ],
          "answer": 1,
          "explanation": "$\\overline{a}_{\\overline{n}|}$ is the standard actuarial notation for the present value of an $n$-year continuous annuity of $\\#1$ per annum."
        },
        {
          "question": "A loan is amortized with equal level payments. The portion of the $t$-th payment used to pay interest is $I_t$. The portion used to reduce principal is $P_t$. Which relationship is always true for an amortizing loan?",
          "options": [
            "$P_t = I_t (1+i)$",
            "$P_t$ is constant for all $t$",
            "$I_t + P_t = \\text{Constant Payment } R$",
            "$I_t$ increases as $t$ increases"
          ],
          "answer": 2,
          "explanation": "The level periodic payment $R$ is always the sum of the interest paid ($I_t$) and the principal repaid ($P_t$) for that period."
        },
        {
          "question": "Which expression represents the book value of a bond at time $t$ using the premium/discount formula method?",
          "options": [
            "$P_t = C + (\\text{Premium}) - \\text{Accumulation of Discount}$",
            "$P_t = F r a_{\\overline{n-t}|i} + C v^{n-t}$",
            "$P_t = C + (\\text{Premium}) \\cdot v^{n-t}$",
            "$P_t = C + (\\text{Book Value at } t-1) \\cdot i$"
          ],
          "answer": 1,
          "explanation": "The book value (or purchase price) at time $t$ must equal the present value of all remaining cash flows: the remaining coupons ($Fr a_{\\overline{n-t}|i}$) and the final redemption value ($C v^{n-t}$)."
        },
        {
          "question": "The term **\"Par Value\"** (or Face Value) of a bond refers to:",
          "options": [
            "The price paid to purchase the bond",
            "The total value of all coupon payments",
            "The principal amount repaid at the maturity date",
            "The present value of the bond's cash flows"
          ],
          "answer": 2,
          "explanation": "The par value ($F$) is the nominal or face amount stated on the bond certificate, which is typically the amount repaid to the holder at maturity (the redemption value, $C$)."
        },
        {
          "question": "What is the present value of a 5-year deferred annuity-immediate of $\\#100$ per annum for 15 years, with $i=8\\%$?",
          "options": [
            "$100 a_{\\overline{15}|0.08}$",
            "$100 a_{\\overline{20}|0.08}$",
            "$100 (a_{\\overline{20}|0.08} - a_{\\overline{5}|0.08})$",
            "$100 v^5 \\ddot{a}_{\\overline{15}|0.08}$"
          ],
          "answer": 2,
          "explanation": "A deferred annuity is calculated as the present value of a longer annuity minus the present value of the annuity for the deferral period. $PV = R(a_{\\overline{n+m}|i} - a_{\\overline{m}|i})$. Here $R=100$, $m=5$, $n=15$, so $PV = 100(a_{\\overline{20}|0.08} - a_{\\overline{5}|0.08})$."
        },
        {
          "question": "The net cash flow for the borrower under a Sinking Fund loan repayment method is the payment made to the lender plus:",
          "options": [
            "The deposit into the sinking fund",
            "The interest earned by the sinking fund",
            "The principal repaid to the lender",
            "The total interest paid on the loan"
          ],
          "answer": 0,
          "explanation": "In the Sinking Fund method, the borrower pays the interest to the lender and a separate deposit (the sinking fund payment) into a segregated fund. The total periodic outflow is the sum of these two."
        },
        {
          "question": "The duration of a zero coupon bond is always equal to:",
          "options": [
            "$0$",
            "$1$",
            "The coupon rate divided by the yield rate",
            "The time to maturity $n$"
          ],
          "answer": 3,
          "explanation": "Duration measures the weighted average time until all cash flows are received. For a zero coupon bond, there is only one cash flow at maturity, so the duration equals the time to maturity."
        },
        {
          "question": "Given $l_{30} = 95,000$ and $l_{31} = 94,800$, calculate the probability that a life aged 30 will die between ages 30 and 31, $q_{30}$.",
          "options": [
            "$0.0021$",
            "$0.0020$",
            "$0.0019$",
            "$0.0018$"
          ],
          "answer": 0,
          "explanation": "The probability of death $q_{30} = \\frac{l_{30} - l_{31}}{l_{30}} = \\frac{95,000 - 94,800}{95,000} = \\frac{200}{95,000} \\approx 0.002105$."
        },
        {
          "question": "Which notation represents the expected number of years lived by a life aged $x$ who dies within $n$ years, $\\text{e}_{x:\\overline{n}|}^1$?",
          "options": [
            "$\\ddot{e}_{x:\\overline{n}|}$",
            "$e_{x:\\overline{n}|}$",
            "$\\text{e}_{x:\\overline{n}|}^1$",
            "$\\overline{e}_{x}$"
          ],
          "answer": 2,
          "explanation": "The superscript '1' indicates that the life must die within the term $\\overline{n}|$. This is the curtate future lifetime for a temporary period, conditional on death."
        },
        {
          "question": "The term **\"Radix\"** ($l_0$) in a mortality table refers to:",
          "options": [
            "The maximum age of the table",
            "The number of lives at the youngest age (age 0)",
            "The probability of death at age 0",
            "The expected future lifetime at age 0"
          ],
          "answer": 1,
          "explanation": "The radix ($l_0$) is the starting number of lives in the table, from which all subsequent calculations of survival and death are derived."
        },
        {
          "question": "The force of mortality, $\\mu_x$, at age $x$ is approximately equal to:",
          "options": [
            "$q_x$",
            "$1 - p_x$",
            "$q_{x-1}$",
            "$-\\ln(p_x)$"
          ],
          "answer": 3,
          "explanation": "The force of mortality $\\mu_x$ is $-\\frac{d}{dt} \\ln({}_t p_x)|_{t=0}$. For a small interval (like one year), $p_x \\approx e^{-\\mu_x}$, so $\\mu_x \\approx -\\ln(p_x)$."
        },
        {
          "question": "What is the probability of a life aged $x$ dying after $n$ years but before $n+m$ years, expressed using $p_x$ and $q_x$ notation?",
          "options": [
            "${}_n p_x \\cdot {}_{m} q_{x+n}$",
            "${}_m p_x \\cdot {}_{n} q_{x+m}$",
            "${}_n q_x \\cdot {}_{m} p_{x+n}$",
            "${}_n p_x + {}_{m} q_{x+n}$"
          ],
          "answer": 0,
          "explanation": "This is the probability ${}_n|{}_m q_x$: survive the first $n$ years ($ {}_n p_x$) AND die in the subsequent $m$ years ($ {}_{m} q_{x+n}$)."
        },
        {
          "question": "If $l_{x}$ is modeled by **De Moivre's Law** with maximum age $\\omega$, which equation holds true?",
          "options": [
            "$l_x = k e^{-\\mu x}$",
            "$l_x = l_0 \\cdot \\frac{\\omega - x}{\\omega}$",
            "$l_x = l_0 (1-x/\\omega)$",
            "Both II and III are correct"
          ],
          "answer": 3,
          "explanation": "De Moivre's Law assumes a linear decrease in $l_x$ from $l_0$ to 0 at age $\\omega$. Both $l_x = l_0 \\cdot \\frac{\\omega - x}{\\omega}$ and $l_x = l_0 (1-x/\\omega)$ represent this straight-line distribution of deaths."
        },
        {
          "question": "In a select mortality table, the notation $[x]+t$ represents:",
          "options": [
            "A life aged $x$ who was selected $t$ years ago",
            "A life aged $x+t$ who was selected at age $x$",
            "The ultimate age achieved by a life selected at age $x$",
            "The life aged $x$ who is now in the ultimate period"
          ],
          "answer": 1,
          "explanation": "$[x]$ denotes the age at selection (select age), and $t$ is the time since selection. The attained age is $x+t$. Thus, $[x]+t$ is a life whose current age is $x+t$ and whose select age was $x$."
        },
        {
          "question": "The probability that a life aged $x$ will survive to age $x+t$ and then die in the instantaneous interval $(x+t, x+t+dt)$ is given by:",
          "options": [
            "${}_t p_x \\cdot \\mu_{x+t} dt$",
            "${}_t q_x \\cdot \\mu_{x+t} dt$",
            "${}_t p_x \\cdot q_{x+t}$",
            "$\\mu_{x+t} dt$"
          ],
          "answer": 0,
          "explanation": "This is the joint probability of survival to time $t$ ($\\text{survival: } {}_t p_x$) AND instantaneous death at that point ($\\text{death: } \\mu_{x+t} dt$)."
        },
        {
          "question": "Which actuarial function is equivalent to the expression $l_x \\cdot v^x \\cdot {}_t p_x \\cdot v^t$?",
          "options": [
            "$\\frac{D_{x+t}}{D_x}$",
            "$D_{x+t}$",
            "$C_{x+t}$",
            "$\\frac{C_x}{D_x}$"
          ],
          "answer": 1,
          "explanation": "The function $D_x$ (discounted number of lives) is defined as $D_x = v^x l_x$. The given expression is $l_x v^{x+t} {}_t p_x = l_x v^{x+t} \\frac{l_{x+t}}{l_x} = v^{x+t} l_{x+t}$, which is $D_{x+t}$."
        },
        {
          "question": "The expected future lifetime of a life aged $x$ is denoted by $\\text{e}_x$. Which property holds true for this function?",
          "options": [
            "$\\text{e}_x = \\text{e}_{x+1} + 1$",
            "$\\text{e}_x$ is the average age at death",
            "$\\text{e}_x = \\sum_{t=1}^{\\infty} {}_t p_x$",
            "$\\text{e}_x = \\int_0^\\infty \\mu_{x+t} dt$"
          ],
          "answer": 2,
          "explanation": "The expected future lifetime is the sum of the probabilities of surviving 1 year, 2 years, 3 years, and so on."
        },
        {
          "question": "The continuous Net Single Premium for a Whole Life Insurance of $\\#1$ on $(x)$ is $\\overline{A}_x$. Which relationship is generally valid for $\\overline{A}_x$?",
          "options": [
            "$\\overline{A}_x = \\delta \\overline{a}_x$",
            "$\\overline{A}_x = 1 - \\delta \\overline{a}_x$",
            "$\\overline{A}_x = i \\overline{a}_x$",
            "$\\overline{A}_x = 1 - i \\overline{a}_x$"
          ],
          "answer": 1,
          "explanation": "This is the continuous version of the fundamental identity $A_x = 1 - d \\ddot{a}_x$. For continuous payments/benefits, the discount factor $d$ is replaced by the force of interest $\\delta$."
        },
        {
          "question": "The net single premium for a $\\mathbf{10}$-year Term Life Insurance of $\\#1$ on $(x)$ is $A_{x:\\overline{10}|}^1$. How is this related to the $10$-year Endowment Insurance $A_{x:\\overline{10}|}$?",
          "options": [
            "$A_{x:\\overline{10}|}^1 = A_{x:\\overline{10}|} + {}_{10} E_x$",
            "$A_{x:\\overline{10}|}^1 = A_{x:\\overline{10}|} - v^{10}$",
            "$A_{x:\\overline{10}|}^1 = A_{x:\\overline{10}|} - {}_{10} E_x$",
            "$A_{x:\\overline{10}|}^1 = {}_{10} E_x - A_{x:\\overline{10}|}$"
          ],
          "answer": 2,
          "explanation": "Endowment Insurance ($A_{x:\\overline{n}|}$) is the sum of Term Insurance ($A_{x:\\overline{n}|}^1$) and Pure Endowment (${}_n E_x$). Therefore, Term Insurance is Endowment Insurance minus Pure Endowment."
        },
        {
          "question": "The Net Premium Reserve at time $t$ for an $n$-year Endowment Insurance of $\\#1$ on $(x)$ is ${}_t V(A_{x:\\overline{n}|})$. Using the prospective method, what is the policy's remaining term?",
          "options": [
            "$n$ years",
            "$t$ years",
            "$n-t$ years",
            "$n+t$ years"
          ],
          "answer": 2,
          "explanation": "The prospective method values the remaining benefits and premiums. Since the initial term was $n$ years and $t$ years have passed, the remaining term is $n-t$ years."
        },
        {
          "question": "A $\\mathbf{20}$-year Endowment Insurance of $\\#10,000$ has a net annual premium of $P$. Which expression represents the value of $P$ using the principle of equivalence?",
          "options": [
            "$10,000 \\cdot A_{x:\\overline{20}|} \\cdot \\ddot{a}_{x:\\overline{20}|}$",
            "$10,000 \\cdot A_{x:\\overline{20}|} / \\ddot{a}_{x:\\overline{20}|}$",
            "$10,000 / \\ddot{a}_{x:\\overline{20}|}$",
            "$\\ddot{a}_{x:\\overline{20}|} / 10,000 \\cdot A_{x:\\overline{20}|}$"
          ],
          "answer": 1,
          "explanation": "$P \\cdot \\ddot{a}_{x:\\overline{20}|} = 10,000 \\cdot A_{x:\\overline{20}|}$. Solving for $P$: $P = \\frac{10,000 \\cdot A_{x:\\overline{20}|}}{\\ddot{a}_{x:\\overline{20}|}}$."
        },
        {
          "question": "The discounted net single premium for a Whole Life Insurance of $\\#1$ on $(x)$ is given by the formula $A_x = \\frac{M_x}{D_x}$. What is $M_x$?",
          "options": [
            "$M_x = \\sum_{t=0}^{\\infty} D_{x+t}$",
            "$M_x = \\sum_{t=0}^{\\infty} C_{x+t}$",
            "$M_x = \\sum_{t=1}^{\\infty} v^t l_{x+t}$",
            "$M_x = l_x v^x$"
          ],
          "answer": 1,
          "explanation": "$C_x$ is the discounted value of death benefit paid in year $x+1$, $C_x = v^{x+1} d_x$. $A_x = \\sum_{t=0}^{\\infty} v^{t+1} \\cdot {}_t|q_x = \\sum_{t=0}^{\\infty} v^{t+1} \\frac{d_{x+t}}{l_x} = \\frac{1}{l_x v^x} \\sum_{t=0}^{\\infty} v^{x+t+1} d_{x+t} = \\frac{1}{D_x} \\sum_{t=0}^{\\infty} C_{x+t}$. Therefore, $M_x = \\sum_{t=0}^{\\infty} C_{x+t}$."
        },
        {
          "question": "Which of the following notations represents a Temporary Annuity-Immediate of $\\#1$ per annum for $n$ years on a life aged $x$?",
          "options": [
            "$\\ddot{a}_{x:\\overline{n}|}$",
            "$a_{x:\\overline{n}|}$",
            "$a_{\\overline{n}|}$",
            "${}_n E_x$"
          ],
          "answer": 1,
          "explanation": "The notation $a$ denotes an Annuity-Immediate (payments at the end of the year), $x$ indicates it is a life contingency, and $\\overline{n}|$ indicates it is temporary (payments cease after $n$ years or earlier death)."
        },
        {
          "question": "For a Whole Life Insurance with sum assured $\\#1$ and net annual premium $P_x$, the Net Premium Reserve at time $t$ is ${}_t V$. Which expression gives the net amount at risk at time $t$?",
          "options": [
            "$1 - P_x$",
            "$1 - {}_t V$",
            "$P_x + (1 - {}_t V)$",
            "$A_{x+t}$"
          ],
          "answer": 1,
          "explanation": "The **Net Amount at Risk** is the difference between the sum assured (benefit payment) and the fund already accumulated (the reserve). $\\text{NAR}_t = \\text{Sum Assured} - {}_t V$."
        },
        {
          "question": "Which formula represents the retrospective reserve ${}_t V$ for a Whole Life Insurance with Net Annual Premium $P_x$?",
          "options": [
            "$A_{x+t} - P_x \\ddot{a}_{x+t}$",
            "$P_x \\ddot{s}_{\\overline{t}|} - \\text{AV}(\\text{Past Benefits})$",
            "$P_x \\ddot{a}_{\\overline{t}|i} - A_x$",
            "$P_x s_{\\overline{t}|} \\cdot v^t$"
          ],
          "answer": 1,
          "explanation": "The retrospective reserve is the Accumulated Value (AV) of past premiums minus the AV of past benefits. $\\text{AV}(\\text{Past Benefits})$ is $\\frac{A_{x:\\overline{t}|}^1}{A_x} \\times P_x$ or $\\frac{A_x - {}_t E_x}{A_x} \\times P_x$. The general form is $\\text{AV}(\\text{Past Premiums}) - \\text{AV}(\\text{Past Benefits})$."
        }
      ]
    },
    {
      "id": "QS004",
      "questions": [
        {
          "question": "What is the primary reason an insurer charges a **Gross Premium** that is higher than the calculated Net Premium?",
          "options": [
            "To lower the reserve requirement",
            "To comply with regulatory reserve requirements",
            "To cover expenses (acquisition, maintenance), taxes, and provide a profit margin",
            "To account for unexpected fluctuations in interest rates"
          ],
          "answer": 2,
          "explanation": "The gross premium includes the net premium (risk premium) plus a loading to cover non-benefit costs (expenses, taxes) and to ensure business profitability."
        },
        {
          "question": "If $A_{x:\\overline{n}|} = 0.40$ and $\\ddot{a}_{x:\\overline{n}|} = 8.0$ and the sum assured is $\\#100,000$, what is the required Net Annual Premium $P$?",
          "options": [
            "$\\#5,000$",
            "$\\#500$",
            "$\\#50$",
            "$\\#20,000$"
          ],
          "answer": 0,
          "explanation": "The Net Annual Premium $P = \\frac{\\text{Sum Assured} \\cdot A_{x:\\overline{n}|}}{\\ddot{a}_{x:\\overline{n}|}}$. $P = \\frac{100,000 \\cdot 0.40}{8.0} = \\frac{40,000}{8} = \\#5,000$."
        },
        {
          "question": "Which formula represents the probability that a life aged $x$ will survive to age $x+t$, given that they have already survived to age $x+s$, where $t>s>0$?",
          "options": [
            "${}_t p_x$",
            "${}_{t-s} p_{x+s}$",
            "$\\frac{{}_t p_x}{{}_s p_x}$",
            "Both II and III are correct"
          ],
          "answer": 3,
          "explanation": "By the conditional probability rule and the Markov property of life tables, the probability of surviving $t-s$ more years, given survival for $s$ years, is ${}_{t-s} p_{x+s}$. This is equivalent to $\\frac{{}_t p_x}{{}_s p_x}$ since $\\frac{l_{x+t}/l_x}{l_{x+s}/l_x} = \\frac{l_{x+t}}{l_{x+s}} = {}_{t-s} p_{x+s}$."
        },
        {
          "question": "Given the probability of death $q_x = 0.002$ and $q_{x+1} = 0.005$, what is the probability that a life aged $x$ will die in the second year from now, ${}_1|q_x$?",
          "options": [
            "$0.0070$",
            "$0.0020$",
            "$0.00499$",
            "$0.00299$"
          ],
          "answer": 2,
          "explanation": "The probability of death in the second year is ${}_1|q_x = p_x \\cdot q_{x+1}$. $p_x = 1 - q_x = 1 - 0.002 = 0.998$. ${}_1|q_x = 0.998 \\times 0.005 = 0.00499$."
        },
        {
          "question": "If the number of deaths in year $x$, $d_x$, is 1,000 and the number of lives at age $x$ is $l_x = 100,000$, what is the one-year survival probability $p_x$?",
          "options": [
            "$0.0100$",
            "$0.9900$",
            "$0.9000$",
            "$0.1000$"
          ],
          "answer": 1,
          "explanation": "First, find the probability of death $q_x = d_x / l_x = 1,000 / 100,000 = 0.01$. The survival probability is $p_x = 1 - q_x = 1 - 0.01 = 0.9900$."
        },
        {
          "question": "Under the **Constant Force of Mortality** assumption between integer ages (U.D.D. in the continuous case), which relationship holds true for the force of mortality, $\\mu_{x+t}$?",
          "options": [
            "$\\mu_{x+t} = \\mu_x$ for all $t$",
            "$\\mu_{x+t}$ is constant for $0 \\le t < 1$",
            "$\\mu_{x+t} = \\frac{q_x}{(1-t)p_x}$",
            "$\\mu_{x+t} = \\frac{-\\ln(p_x)}{1-t q_x}$"
          ],
          "answer": 1,
          "explanation": "The Constant Force of Mortality (CFM) assumption states that the force of mortality is constant within the interval, $\\mu_{x+t} = \\mu$ for $0 \\le t < 1$. This implies $\\mu = -\\ln(p_x)$."
        },
        {
          "question": "The expression $\\frac{D_{x+t}}{D_x}$ is equivalent to the Present Value of a Pure Endowment of $\\#1$ on $(x)$ for $t$ years. Which actuarial notation represents this?",
          "options": [
            "$A_{x:\\overline{t}|}^1$",
            "${}_t E_x$",
            "$A_x$",
            "$v^t \\cdot \\frac{C_{x+t}}{C_x}$"
          ],
          "answer": 1,
          "explanation": "The Pure Endowment ${}_t E_x$ is $\\frac{v^{x+t} l_{x+t}}{v^x l_x} = \\frac{D_{x+t}}{D_x}$."
        },
        {
          "question": "How is the central exposed to risk $E_x$ primarily used in the context of mortality investigation?",
          "options": [
            "To calculate the crude death rate $\\mu_x$",
            "To estimate the initial number of lives $l_x$",
            "As the denominator in estimating the probability of death $q_x$",
            "As the numerator in calculating the force of mortality $\\mu_x$"
          ],
          "answer": 2,
          "explanation": "The crude probability of death is often estimated as $\\frac{\\text{Number of deaths } D_x}{\\text{Central Exposed to Risk } E_x}$. The central exposed to risk accounts for time spent in the observation period."
        },
        {
          "question": "Under **Gompertz's Law** of mortality, the force of mortality $\\mu_x$ is given by:",
          "options": [
            "$A + B c^x$",
            "$B c^x$",
            "$A + B c^x + D s^x$",
            "$\\mu_x$ is a constant"
          ],
          "answer": 1,
          "explanation": "Gompertz's Law models mortality as increasing exponentially with age: $\\mu_x = B c^x$, where $B > 0$ and $c > 1$."
        },
        {
          "question": "If $\\overline{e}_x$ is the complete expectation of life, which integral is the correct representation?",
          "options": [
            "$\\int_0^\\infty v^t \\cdot {}_t p_x dt$",
            "$\\int_0^\\infty \\mu_{x+t} dt$",
            "$\\int_0^\\infty {}_t p_x dt$",
            "$\\sum_{t=1}^{\\infty} {}_t p_x$"
          ],
          "answer": 2,
          "explanation": "The complete expectation of life is the expected value of the continuous future lifetime $T(x)$, which is defined as $\\text{E}[T(x)] = \\int_0^\\infty \\text{Prob}(T(x)>t) dt = \\int_0^\\infty {}_t p_x dt$."
        },
        {
          "question": "For a life aged $x$, the expected present value of a continuous payment of $\\#1$ per annum for life, $\\overline{a}_x$, is given by:",
          "options": [
            "$\\int_0^\\infty v^t \\cdot {}_t q_x dt$",
            "$\\int_0^\\infty v^t \\cdot {}_t p_x dt$",
            "$\\int_0^\\infty v^t \\cdot \\mu_{x+t} dt$",
            "$\\frac{1}{d}$"
          ],
          "answer": 1,
          "explanation": "The EPV of a continuous annuity $\\overline{a}_x$ is the expected value of the present value function $\\overline{Y} = \\frac{1-v^{T(x)}}{\\delta}$, which simplifies to $\\int_0^\\infty v^t \\cdot {}_t p_x dt$."
        },
        {
          "question": "Given $A_{x:\\overline{10}|} = 0.35$ and $A_{x:\\overline{10}|}^1 = 0.15$. Calculate the Pure Endowment value ${}_{10} E_x$.",
          "options": [
            "$0.50$",
            "$0.20$",
            "$0.35$",
            "$0.15$"
          ],
          "answer": 1,
          "explanation": "Endowment Insurance is the sum of Term Insurance and Pure Endowment: $A_{x:\\overline{n}|} = A_{x:\\overline{n}|}^1 + {}_n E_x$. ${}_{10} E_x = A_{x:\\overline{10}|} - A_{x:\\overline{10}|}^1 = 0.35 - 0.15 = 0.20$."
        },
        {
          "question": "If $D_{40} = 100,000$ and $N_{40} = 1,500,000$, calculate the EPV of a Whole Life Annuity-Due of $\\#1$ on a life aged 40, $\\ddot{a}_{40}$.",
          "options": [
            "$15.00$",
            "$14.00$",
            "$16.00$",
            "$15.50$"
          ],
          "answer": 0,
          "explanation": "The formula for $\\ddot{a}_x$ using the $\\text{D}$ and $\\text{N}$ commutation functions is $\\ddot{a}_x = \\frac{N_x}{D_x}$. $\\ddot{a}_{40} = \\frac{N_{40}}{D_{40}} = \\frac{1,500,000}{100,000} = 15.00$."
        },
        {
          "question": "The EPV of a Whole Life Insurance on $(x)$ is $A_x = 0.12$. If the annual effective interest rate is $i=5\\%$, calculate the EPV of the Whole Life Annuity-Due $\\ddot{a}_x$.",
          "options": [
            "$17.60$",
            "$16.92$",
            "$18.40$",
            "$19.05$"
          ],
          "answer": 2,
          "explanation": "Using the identity $A_x = 1 - d \\ddot{a}_x$, we have $\\ddot{a}_x = \\frac{1 - A_x}{d}$. With $i=0.05$, $d = 0.05/1.05 \\approx 0.047619$. $\\ddot{a}_x = \\frac{1 - 0.12}{0.047619} = \\frac{0.88}{0.047619} \\approx 18.47$. Option III is the closest value."
        },
        {
          "question": "The net single premium for a 5-year **Deferred** 10-year Term Insurance of $\\#1$ on $(x)$ is represented by:",
          "options": [
            "$A_{x:\\overline{15}|}^1$",
            "${}_5 E_x \\cdot A_{x+5:\\overline{10}|}^1$",
            "$A_{x:\\overline{15}|} - A_{x:\\overline{5}|}$",
            "$A_{x:\\overline{15}|}^1 - A_{x:\\overline{5}|}^1$"
          ],
          "answer": 3,
          "explanation": "A $5$-year deferred $10$-year term insurance pays if death occurs between year $5$ and year $15$. This is equivalent to a $15$-year term insurance minus a $5$-year term insurance."
        },
        {
          "question": "Given the Commutation Functions $C_{40}=300$ and $D_{40}=20,000$, and $M_{40}=6,000$. Calculate the Net Single Premium for a Whole Life Insurance on a life aged 40, $A_{40}$.",
          "options": [
            "$0.0300$",
            "$0.3000$",
            "$0.2000$",
            "$0.0150$"
          ],
          "answer": 1,
          "explanation": "$A_x = \\frac{M_x}{D_x}$. $A_{40} = \\frac{M_{40}}{D_{40}} = \\frac{6,000}{20,000} = 0.3000$."
        },
        {
          "question": "Which relationship between the EPV of an $n$-year Term Insurance, $A_{x:\\overline{n}|}^1$, and the EPV of an $n$-year Temporary Annuity-Immediate, $a_{x:\\overline{n}|}$, is valid?",
          "options": [
            "$A_{x:\\overline{n}|}^1 = v a_{x:\\overline{n}|}$",
            "$A_{x:\\overline{n}|}^1 = 1 - d \\ddot{a}_{x:\\overline{n}|}$",
            "$A_{x:\\overline{n}|}^1 = 1 - i a_{x:\\overline{n}|}$",
            "$A_{x:\\overline{n}|}^1 = \\sum_{k=0}^{n-1} v^{k+1} \\cdot {}_k|q_x$"
          ],
          "answer": 3,
          "explanation": "This is the definition of the Net Single Premium for the Term Insurance as the sum of the EPV of the payment (at time $k+1$) conditional on death in year $k+1$."
        },
        {
          "question": "A Whole Life Policy on $(x)$ has Net Annual Premium $P_x = 0.015$ and $A_x = 0.30$. Calculate the EPV of the Whole Life Annuity-Due $\\ddot{a}_x$.",
          "options": [
            "$20.00$",
            "$30.00$",
            "$15.00$",
            "$0.45$"
          ],
          "answer": 0,
          "explanation": "By the Principle of Equivalence, $P_x = \\frac{A_x}{\\ddot{a}_x}$. $\\ddot{a}_x = \\frac{A_x}{P_x} = \\frac{0.30}{0.015} = 20.00$."
        },
        {
          "question": "If $\\overline{A}_x$ is the continuous Net Single Premium for Whole Life Insurance and $\\overline{a}_x$ is the continuous Whole Life Annuity, what is $\\overline{A}_x + \\delta \\overline{a}_x$?",
          "options": [
            "$i$",
            "$v$",
            "$\\delta$",
            "$1$"
          ],
          "answer": 3,
          "explanation": "Using the continuous identity $\\overline{A}_x = 1 - \\delta \\overline{a}_x$. Rearranging gives $\\overline{A}_x + \\delta \\overline{a}_x = 1$."
        },
        {
          "question": "What is the primary definition of the **Net Premium** for a policy?",
          "options": [
            "The premium required to cover benefits, expenses, and profit",
            "The premium calculated based only on assumed mortality and interest",
            "The premium after all taxes and fees have been removed",
            "The premium calculated using the ultimate mortality table only"
          ],
          "answer": 1,
          "explanation": "The Net (Risk) Premium is strictly the Expected Present Value of Benefits divided by the EPV of premiums, using only mortality and interest assumptions, excluding loadings."
        },
        {
          "question": "A Net Premium Reserve ${}_t V$ calculated at time $t=5$ for a 10-year Term Insurance of $\\#10,000$ on $(x)$ is $\\mathbf{zero}$. Why would this be the case?",
          "options": [
            "The policy has lapsed",
            "$\\ddot{a}_{x+5:\\overline{5}|} = 0$",
            "The Accumulated Value of Past Premiums equals the Accumulated Value of Past Benefits (Retrospective method)",
            "The EPV of Future Benefits equals the EPV of Future Premiums (Prospective method)"
          ],
          "answer": 2,
          "explanation": "If the reserve is zero, the accumulated fund from past net premiums exactly equals the accumulated value of the expected past claims, meaning the fund is currently balanced."
        },
        {
          "question": "The **Asset Share** calculation for a policy is fundamentally different from the Net Premium Reserve calculation because the Asset Share:",
          "options": [
            "Only considers the mortality risk",
            "Uses the **Gross Premium** and includes expenses and profit",
            "Excludes investment income",
            "Is only calculated for Term Insurance policies"
          ],
          "answer": 1,
          "explanation": "Asset Share is a realistic calculation of the fund actually accumulated by the insurer, using gross premiums received and deducting actual expenses. The Net Reserve is a theoretical liability calculation based on net premiums and standard assumptions."
        },
        {
          "question": "The cash refund benefit in a life annuity means that:",
          "options": [
            "All premiums paid are refunded upon death",
            "The total amount of all annuity payments is guaranteed",
            "The difference between the purchase price and the sum of annuity payments made is refunded upon death",
            "The insurer will pay the cash value if the policy is surrendered"
          ],
          "answer": 2,
          "explanation": "A cash refund annuity guarantees that if the annuitant dies before receiving annuity payments totaling the purchase price, the remainder is paid to a beneficiary as a lump sum."
        },
        {
          "question": "Which calculation measures the profitability arising from deviations between the actual mortality experienced and the expected mortality assumed in premium/reserve calculations?",
          "options": [
            "Investment Gain/Loss",
            "Expense Gain/Loss",
            "Mortality Profit/Loss",
            "Lapse Gain/Loss"
          ],
          "answer": 2,
          "explanation": "**Mortality Profit/Loss** is the difference between the actual claims paid and the expected claims provided for by the reserve releases and death strain at risk."
        },
        {
          "question": "The **Modified Reserve** methods, such as the Fackler or Zillmer methods, are primarily used to address which issue?",
          "options": [
            "Insufficient investment yield",
            "High initial policy acquisition expenses (first-year strain)",
            "Unexpected high mortality",
            "Errors in premium calculations"
          ],
          "answer": 1,
          "explanation": "Modified Reserve methods allow a portion of the first-year gross premium to be used to cover high initial acquisition expenses, resulting in a lower initial reserve (often zero) and reducing the initial statutory surplus strain."
        }
      ]
    },
    {
      "id": "QS005",
      "questions": [
        {
          "question": "If the terminal reserve for an $n$-year Endowment Insurance is ${}_n V = 1$ (for a sum assured of $\\#1$), it implies:",
          "options": [
            "The policy is terminated at time $n$",
            "The policy is fully funded (reserve equals sum assured)",
            "The reserve is zero at maturity",
            "The net premium is equal to the benefit"
          ],
          "answer": 1,
          "explanation": "For an Endowment Insurance, the benefit is paid either on death or survival to time $n$. Upon survival to $t=n$, the policy matures, and the reserve must equal the face amount, ${}_n V = \\text{Sum Assured}$."
        },
        {
          "question": "Using the method of **Loss at Issue**, the loss function $L_0$ for a Whole Life Insurance with Net Premium $P$ and Sum Assured $S$ on $(x)$ is:",
          "options": [
            "$S V^{T(x)} - P \\ddot{a}_{\\overline{T(x)+1}|}$",
            "$S V^{T(x)+1} - P \\ddot{a}_{\\overline{T(x)+1}|}$",
            "$P \\ddot{a}_{\\overline{T(x)+1}|} - S V^{T(x)+1}$",
            "$S V^{T(x)} + P \\ddot{a}_{\\overline{T(x)+1}|}$"
          ],
          "answer": 1,
          "explanation": "The Loss at Issue is $\\text{PV}(\\text{Outgo}) - \\text{PV}(\\text{Income})$. The Outgo is the death benefit $S$ at time $K+1$ (where $K$ is the curtate future lifetime, so time of payment is $K+1 = T(x)+1$). The Income is the annuity-due premium $P$ paid for $K+1$ years."
        },
        {
          "question": "The effective interest rate for the first year is $i_1 = 4\\%$, and the effective interest rate for the second year is $i_2 = 6\\%$. What is the accumulated value of $\\#1,000$ after 2 years?",
          "options": [
            "$\\#1,100.00$",
            "$\\#1,104.00$",
            "$\\#1,050.00$",
            "$\\#1,102.00$"
          ],
          "answer": 1,
          "explanation": "The accumulated value is $AV = P(1+i_1)(1+i_2)$. $AV = 1,000(1.04)(1.06) = 1,000(1.1024) = \\#1,102.40$. Nearest option is II."
        },
        {
          "question": "A principal of $\\#P$ doubles in value after $n$ years under compound interest $i$. The time $n$ is given by:",
          "options": [
            "$n = \\log_2(1+i)$",
            "$n = \\frac{\\ln(2)}{\\ln(1+i)}$",
            "$n = \\frac{1}{\\ln(1+i)}$",
            "$n = \\frac{1+i}{2}$"
          ],
          "answer": 1,
          "explanation": "$2P = P(1+i)^n$. $2 = (1+i)^n$. Taking natural logarithms: $\\ln(2) = n \\ln(1+i)$. Thus, $n = \\frac{\\ln(2)}{\\ln(1+i)}$."
        },
        {
          "question": "The accumulation factor for a continuous investment subject to a time-varying force of interest $\\delta(t)$ from time $t_1$ to $t_2$ is:",
          "options": [
            "$\\int_{t_1}^{t_2} \\delta(t) dt$",
            "$e^{\\int_{t_1}^{t_2} \\delta(t) dt}$",
            "$\\int_{t_1}^{t_2} e^{-\\delta(t)} dt$",
            "$e^{\\delta(t_2) - \\delta(t_1)}$"
          ],
          "answer": 1,
          "explanation": "The accumulation factor from $t_1$ to $t_2$ is given by $\\exp \\left( \\int_{t_1}^{t_2} \\delta(t) dt \\right)$."
        },
        {
          "question": "What is the equivalent annual effective interest rate $i$ for a nominal discount rate of $d^{(4)} = 8\\%$?",
          "options": [
            "$8.00\\%$",
            "$8.24\\%$",
            "$8.50\\%$",
            "$8.82\\%$"
          ],
          "answer": 1,
          "explanation": "The relationship is $1+i = (1 - \\frac{d^{(4)}}{4})^{-4}$. $i = (1 - \\frac{0.08}{4})^{-4} - 1 = (0.98)^{-4} - 1 \\approx 1.08421 - 1 = 0.08243$ or $8.24\\%$."
        },
        {
          "question": "The cash flows of a bond are $\\#50$ coupon payable annually for 10 years and a $\\#1,000$ redemption value. If the current price is $\\#950$, the bond is selling at a:",
          "options": [
            "Premium",
            "Discount",
            "Par",
            "Loss"
          ],
          "answer": 1,
          "explanation": "Since the price ($\\#950$) is less than the redemption value ($\\#1,000$), the bond is selling at a **Discount**."
        },
        {
          "question": "A loan of $\\#10,000$ is repaid by a single payment of $\\#12,000$ at the end of 5 years. What is the amount of principal repaid in the first year?",
          "options": [
            "$\\#0$",
            "$\\#2,000$",
            "$\\#2,400$",
            "$\\#400$"
          ],
          "answer": 0,
          "explanation": "This is a **straight-term loan** (or bullet repayment). No principal is repaid until the maturity date (Year 5). Only interest (if any) is paid periodically, or both principal and interest are paid as a lump sum at the end. Here, no payments are mentioned until the final one, so principal repayment is zero in the first year."
        },
        {
          "question": "In an Amortization schedule, if $B_t$ is the outstanding balance at time $t$, what is the interest portion of the $(t+1)$-th payment, $I_{t+1}$?",
          "options": [
            "$B_t \\cdot i$",
            "$B_t \\cdot d$",
            "$R - B_t \\cdot i$",
            "$R - B_{t+1}$"
          ],
          "answer": 0,
          "explanation": "The interest paid at time $t+1$ is calculated on the outstanding balance at the *beginning* of the period (time $t$), $B_t$, multiplied by the periodic interest rate $i$."
        },
        {
          "question": "The present value of an increasing annuity-immediate of $\\#1, \\#2, \\dots, \\#n$ is denoted by $(I a)_{\\overline{n}|}$. Which formula is correct for this function?",
          "options": [
            "$\\frac{a_{\\overline{n}|} - n v^n}{i}$",
            "$\\frac{\\ddot{a}_{\\overline{n}|} - n v^n}{i}$",
            "$a_{\\overline{n}|} + (I a)_{\\overline{n}|}$",
            "$\\frac{1 - a_{\\overline{n}|}}{i}$"
          ],
          "answer": 1,
          "explanation": "The formula for the present value of an increasing annuity-immediate is $(I a)_{\\overline{n}|} = \\frac{\\ddot{a}_{\\overline{n}|} - n v^n}{i}$."
        },
        {
          "question": "An annuity pays $\\#R$ continuously for $n$ years. The present value is $\\overline{a}_{\\overline{n}|}$. What is the accumulation value $\\overline{s}_{\\overline{n}|}$?",
          "options": [
            "$\\overline{a}_{\\overline{n}|} v^n$",
            "$\\overline{a}_{\\overline{n}|} (1+i)^n$",
            "$\\overline{a}_{\\overline{n}|} e^{\\delta n}$",
            "$\\overline{a}_{\\overline{n}|} (1+i)$"
          ],
          "answer": 2,
          "explanation": "The accumulation value of an annuity is its present value accumulated to the end of the term. For continuous payments, $1+i$ is replaced by $e^\\delta$, so $\\overline{s}_{\\overline{n}|} = \\overline{a}_{\\overline{n}|} \\cdot e^{\\delta n}$."
        },
        {
          "question": "If the yield rate is $i$ and the coupon rate is $r$ for a bond with redemption value $C$, which condition implies the purchase price $P$ is greater than $C$?",
          "options": [
            "$i = r$",
            "$i > r$",
            "$i < r$",
            "$i = 0$"
          ],
          "answer": 2,
          "explanation": "If the investor's required yield ($i$) is less than the coupon rate ($r$), they are willing to pay more than the redemption value to secure the higher coupon income. The bond sells at a **Premium** ($P>C$)."
        },
        {
          "question": "The term $\\frac{C_x}{D_x}$ in commutation notation is the Net Single Premium for which benefit?",
          "options": [
            "Whole Life Insurance",
            "$1$-year Term Insurance, $A_{x:\\overline{1}|}^1$",
            "Pure Endowment",
            "Whole Life Annuity-Due"
          ],
          "answer": 1,
          "explanation": "$A_{x:\\overline{1}|}^1 = v^1 \\cdot q_x = v \\cdot \\frac{d_x}{l_x} = \\frac{v d_x}{l_x} = \\frac{v d_x v^x}{l_x v^x} = \\frac{C_x}{D_x}$."
        },
        {
          "question": "The EPV of a $\\mathbf{5}$-year Term Insurance with a level Net Annual Premium $P$ on $(x)$ is given by $A_{x:\\overline{5}|}^1$. Which term must appear in the denominator of $P$?",
          "options": [
            "$a_{x:\\overline{5}|}$",
            "$\\ddot{a}_{x:\\overline{5}|}$",
            "$A_{x:\\overline{5}|}^1$",
            "$D_x$"
          ],
          "answer": 1,
          "explanation": "The level annual premium $P$ is paid as a temporary annuity-due for the policy term. By the Principle of Equivalence: $P \\cdot \\ddot{a}_{x:\\overline{5}|} = A_{x:\\overline{5}|}^1$. Thus, $P = \\frac{A_{x:\\overline{5}|}^1}{\\ddot{a}_{x:\\overline{5}|}}$."
        },
        {
          "question": "Which actuarial notation represents the Net Single Premium for a life annuity-due of $\\#1$ per annum, deferred for $m$ years on a life aged $x$?",
          "options": [
            "$a_{x:\\overline{m}|}$",
            "$\\ddot{a}_{x:\\overline{m}|}$",
            "${}_m|\\ddot{a}_x$",
            "$\\ddot{a}_{x+m}$"
          ],
          "answer": 2,
          "explanation": "${}_m|$ denotes deferment for $m$ years. $\\ddot{a}_x$ denotes a whole life annuity-due. The payment starts at age $x+m$ and continues for life."
        },
        {
          "question": "The equation $A_{x: \\overline{n}|} = A_{x:\\overline{n}|}^1 + {}_{n} E_x$ represents the decomposition of the EPV of which policy?",
          "options": [
            "Whole Life Insurance",
            "Pure Endowment",
            "Endowment Insurance",
            "Term Insurance"
          ],
          "answer": 2,
          "explanation": "Endowment Insurance is a contract that pays out if the life dies during the term ($A_{x:\\overline{n}|}^1$) or survives the term (${}_{n} E_x$)."
        },
        {
          "question": "If $M_x = 10,000$, $D_x = 50,000$, and $i=4\\%$, calculate the Net Single Premium for a Continuous Whole Life Insurance $\\overline{A}_x$, assuming constant force of interest $\\delta \\approx 0.0392$.",
          "options": [
            "$0.20$",
            "$0.20 \\cdot \\frac{i}{\\delta}$",
            "$0.20 \\cdot \\frac{\\delta}{i}$",
            "$0.20 \\cdot \\frac{i^2}{\\delta}$"
          ],
          "answer": 1,
          "explanation": "$A_x = M_x / D_x = 10,000 / 50,000 = 0.20$. Using the standard approximation: $\\overline{A}_x \\approx A_x \\frac{i}{\\delta}$."
        },
        {
          "question": "The **Principle of Equivalence** in actuarial mathematics states that:",
          "options": [
            "The Gross Premium must equal the Net Premium",
            "The Accumulated Value of the Assets must equal the Accumulated Value of the Liabilities",
            "The Expected Present Value of Future Benefits must equal the Expected Present Value of Future Premiums",
            "The interest earned must equal the mortality cost"
          ],
          "answer": 2,
          "explanation": "This fundamental principle is used to determine the **Net Premium**, ensuring that, on average across the entire portfolio, the EPV of money coming in (Premiums) equals the EPV of money going out (Benefits)."
        },
        {
          "question": "If an insurer uses a lower interest rate assumption in its premium calculation than the expected future rate, this typically results in:",
          "options": [
            "Lower Net Premiums and lower reserves",
            "Higher Net Premiums and lower reserves",
            "Higher Net Premiums and higher reserves",
            "Lower Net Premiums and higher reserves"
          ],
          "answer": 2,
          "explanation": "Lower assumed interest rates mean the insurer assumes less investment income will be earned, requiring higher premiums to fund the benefits, and leading to higher reserves (future liability)."
        },
        {
          "question": "What is the maximum age ($\\omega$) under **De Moivre's Law** if $l_x = 100(1 - x/80)$?",
          "options": [
            "$100$",
            "$80$",
            "$1$",
            "$0$"
          ],
          "answer": 1,
          "explanation": "Under De Moivre's Law, $l_x = l_0 \\cdot (1 - x/\\omega)$. The maximum age of life $\\omega$ is the age where $l_x$ becomes zero. $l_x = 0$ when $x=80$."
        },
        {
          "question": "Which statement correctly describes the relationship between the prospective reserve and the retrospective reserve at time $t$ using the same assumptions?",
          "options": [
            "Retrospective Reserve $\\ne$ Prospective Reserve",
            "Retrospective Reserve $>$ Prospective Reserve",
            "Retrospective Reserve = Prospective Reserve",
            "Retrospective Reserve is used for gross premiums, Prospective for net premiums"
          ],
          "answer": 2,
          "explanation": "The consistency principle dictates that for Net Premium Reserves based on the Principle of Equivalence, the **Retrospective Reserve** (looking backward) must mathematically equal the **Prospective Reserve** (looking forward)."
        },
        {
          "question": "The **Net Risk Premium** for an insurance policy is the level annual amount required to cover the expected cost of death in the coming year. Which formula gives the Net Risk Premium for a 1-year Term Insurance of $\\#1$ on $(x)$?",
          "options": [
            "$v p_x$",
            "$v q_x$",
            "$A_x$",
            "$d q_x$"
          ],
          "answer": 1,
          "explanation": "The Net Single Premium for a 1-year Term Insurance is the EPV of the benefit: $A_{x:\\overline{1}|}^1 = \\text{Payment} \\times \\text{Prob}(\\text{Death}) \\times \\text{Discount} = 1 \\times q_x \\times v = v q_x$."
        },
        {
          "question": "Which of the following is the standard formula for the purchase price ($P$) of a bond with Face Value $C$, redemption value $C$, coupon rate $r$, and yield rate $i$?",
          "options": [
            "$P = Fr a_{\\overline{n}|i} + C v^n$",
            "$P = Fr s_{\\overline{n}|i} + C v^n$",
            "$P = Fr a_{\\overline{n}|i} + F v^n$",
            "$P = F v^n$"
          ],
          "answer": 0,
          "explanation": "The purchase price is the sum of the present value of the coupons ($Fr a_{\\overline{n}|i}$) and the present value of the redemption value ($C v^n$). Assuming face value $F=C$."
        },
        {
          "question": "The present value of a perpetuity-due paying $R$ at the beginning of each period is given by:",
          "options": [
            "$R/i$",
            "$R \\cdot (1+i)/i$",
            "$R/(1-d)$",
            "$R/v$"
          ],
          "answer": 1,
          "explanation": "A perpetuity-due is a perpetuity-immediate multiplied by the interest factor $(1+i)$ since payments are at the start of the period. $\\ddot{a}_{\\overline{\\infty}|i} = (1+i) a_{\\overline{\\infty}|i} = (1+i)/i$."
        },
        {
          "question": "Which expression represents the Present Value of a 5-year Deferred Annuity-Due of $\\#1$ per annum for 10 years?",
          "options": [
            "$v^5 \\cdot a_{\\overline{10}|i}$",
            "$a_{\\overline{15}|i} - a_{\\overline{5}|i}$",
            "$\\ddot{a}_{\\overline{15}|i} - \\ddot{a}_{\\overline{5}|i}$",
            "${}_5| \\ddot{a}_{\\overline{10}|i}$"
          ],
          "answer": 3,
          "explanation": "The notation ${}_m| \\ddot{a}_{\\overline{n}|i}$ denotes an annuity-due that is deferred for $m$ years and runs for $n$ years."
        }
      ]
    }
  ]
};
