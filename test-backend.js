// Quick test to see backend response time
const testBackend = async () => {
    console.log('⏱️  Testing backend response time...\n');

    const startTime = Date.now();

    try {
        const response = await fetch('https://small-wonders-backend.onrender.com/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fullName: "Quick Test",
                classApplying: "Playgroup",
                message: "Testing backend wake-up time"
            })
        });

        const endTime = Date.now();
        const duration = ((endTime - startTime) / 1000).toFixed(2);

        const result = await response.json();

        console.log(`✅ SUCCESS in ${duration} seconds`);
        console.log('Response:', result);

    } catch (error) {
        const endTime = Date.now();
        const duration = ((endTime - startTime) / 1000).toFixed(2);

        console.log(`❌ FAILED after ${duration} seconds`);
        console.log('Error:', error.message);
    }
};

testBackend();
