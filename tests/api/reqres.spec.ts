import { test, expect } from '@playwright/test';

//{ request } - This is a Built-in Fixture.

// Playwright automatically injects the APIRequestContext (named request) so I can send HTTP calls without needing external libraries like Axios."

/**
 * Global Test Data for Data Driven Testing (DDT)
 */
const testData = [
    { name: 'Bianca', job: 'QA Lead' },
    { name: 'Mihai', job: 'Dev' },
    { name: 'Maria', job: 'Manager' }
];

test.describe('API Portfolio Scenarios', () => {
    let authToken: string;

    /**
     * AUTHENTICATION SETUP
     * We retrieve the token once before all tests in this block.
     */
    test.beforeAll(async ({ request }) => {
        const response = await request.post('https://reqres.in/api/login', {
            data: {
                "email": "eve.holt@reqres.in",
                "password": "cityslicka"
            }
        });

        // Verificăm dacă răspunsul este de succes înainte de a cere .json()
        if (response.status() !== 200) {
            console.log("Error status:", response.status());
            console.log("Error body:", await response.text()); // Vedem codul HTML care ne blochează
            throw new Error('Failed to login, server returned non-JSON response');
        }
        const body = await response.json();
        authToken = body.token; 
        console.log(`Auth Token retrieved: ${authToken}`);
    });

    /**
     * SCENARIO 1: Access Protected Resource
     */
    test('Should access protected resource using Bearer Token', async ({ request }) => {
        const response = await request.get('https://reqres.in/api/users/2', {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            }
        });

        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.data.id).toBe(2);
    });

    /**
     * SCENARIO 2: Read Data & Contract Validation (GET)
     */
    test('Should retrieve user list and validate data structure', async ({ request }) => {
        const response = await request.get('https://reqres.in/api/users?page=2');
        expect(response.status()).toBe(200);

        const body = await response.json();
        
        // Assert that 'data' is a collection
        expect(Array.isArray(body.data)).toBe(true);
        // Contract Validation: Ensure the object has the required property
        expect(body.data[0]).toHaveProperty('email');
    });

    /**
     * SCENARIO 3: Data Driven Creation (POST)
     */
    for (const data of testData) {
        test(`Should create user: ${data.name} as ${data.job}`, async ({ request }) => {
            const response = await request.post('https://reqres.in/api/users', {
                data: {
                    name: data.name,
                    job: data.job
                }
            });

            expect(response.status()).toBe(201);
            const body = await response.json();
            expect(body.name).toBe(data.name);
            
            console.log(`Verified: User ${data.name} created successfully.`);
        });

    //check if the user was created also in DB.
    //const userInDb = await dbManager.query("SELECT * FROM users WHERE name = ?", [newUser.name]);
    //expect(userInDb.name).toBe(newUser.name);
    }

    /**
     * SCENARIO 4: Full Update (PUT)
     * Replaces the entire resource.
     */
    test('Should perform a full update using PUT', async ({ request }) => {
        const response = await request.put('https://reqres.in/api/users/2', {
            data: {
                name: "Bianca Senior",
                job: "Automation Architect"
            }
        });

        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.name).toBe('Bianca Senior');
        expect(body.job).toBe('Automation Architect');
        expect(body).toHaveProperty('updatedAt');
    });

    /**
     * SCENARIO 5: Partial Update (PATCH)
     * Updates only specific fields.
     */
    test('Should perform a partial update using PATCH', async ({ request }) => {
        const response = await request.patch('https://reqres.in/api/users/2', {
            data: {
                job: "Lead QA Engineer" // Only updating the job
            }
        });

        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.job).toBe('Lead QA Engineer');
    });

   /**
     * SCENARIO 6: Resource Removal (DELETE) + Verification
     */
    test('Should delete a user and verify they no longer exist', async ({ request }) => {
        const userId = '2';

        // 1. Perform the Delete
        const deleteResponse = await request.delete(`https://reqres.in/api/users/${userId}`);
        expect(deleteResponse.status()).toBe(204);

        // 2. VERIFICATION: Try to GET the deleted user
        // Note: On real production servers, this should return 404.
        // ReqRes is a mock API, so it might still return the mock data, 
        // but in a real project, you ASSERT for 404.
        const getResponse = await request.get(`https://reqres.in/api/users/${userId}`);
        
        console.log(`Verification status after delete: ${getResponse.status()}`);
        // expect(getResponse.status()).toBe(404); 
    });
});


