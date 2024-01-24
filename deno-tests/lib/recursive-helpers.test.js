import {init, describe, it, beforeEach, beforeAll, afterEach, afterAll, assertEquals} from "./../dependencies.js";

describe("Recursive Helpers Tests", async () => {
    let module, instance

    beforeAll(async () => {
        await init();
        module = await import("./../../lib/recursive-helpers.js");
        instance = module.RecursiveHelpers;
    });

    afterAll(async () => {
        module = null;
    });

    describe("Factorial Calculator", async () => {
        it("Factorial of 1", async () => {
            // Arrange
            // Act
            const result = await instance.factorial(1);

            // Assert;
            assertEquals(result, 1);
        });

        it("Factorial of 2", async () => {
            // Arrange
            // Act
            const result = await instance.factorial(2);

            // Assert;
            assertEquals(result, 2);
        });

        it("Factorial of 3", async () => {
            // Arrange
            // Act
            const result = await instance.factorial(3);

            // Assert;
            assertEquals(result, 6);
        });

        it("Factorial of 4", async () => {
            // Arrange
            // Act
            const result = await instance.factorial(4);

            // Assert;
            assertEquals(result, 24);
        });

        it("Factorial of 5", async () => {
            // Arrange
            // Act
            const result = await instance.factorial(5);

            // Assert;
            assertEquals(result, 120);
        });

        it("Factorial of 100", async () => {
            // Arrange
            // Act
            const result = await instance.factorial(100);

            // Assert;
            assertEquals(result, 9.33262154439441e+157);
        });

        it("Factorial of 0", async () => {
            // Arrange
            // Act
            const result = await instance.factorial(0);

            // Assert;
            assertEquals(result, 1);
        });

        it("Factorial of -1", async () => {
            // Arrange
            // Act
            const result = await instance.factorial(-1);

            // Assert;
            assertEquals(result, "Invalid input");
        });

        it("Factorial of -5", async () => {
            // Arrange
            // Act
            const result = await instance.factorial(-5);

            // Assert;
            assertEquals(result, "Invalid input");
        });

        it("Factorial of 0.5", async () => {
            // Arrange
            // Act
            const result = await instance.factorial(0.5);

            // Assert;
            assertEquals(result, "Invalid input");
        });
    })

    // describe("Fibonacci Calculator", async () => {
    //     it("Fibonacci of 0", async () => {
    //         //Arrange
    //         //Act
    //
    //         //Assert
    //     })
    //
    //     it("Fibonacci of 1", async () => {
    //         //Arrange
    //         //Act
    //
    //         //Assert
    //     })
    //
    //     it("Fibonacci of 2", async () => {
    //         //Arrange
    //         //Act
    //         const result = await instance.fibonacci();
    //         //Assert
    //     })
    //
    //     it("Fibonacci of 3", async () => {
    //         //Arrange
    //         //Act
    //         const result = await instance.fibonacci();
    //         //Assert
    //     })
    //
    //     it("Fibonacci of 4", async () => {
    //         //Arrange
    //         //Act
    //         const result = await instance.fibonacci();
    //         //Assert
    //     })
    //
    //     it("Fibonacci of 5", async () => {
    //         //Arrange
    //         //Act
    //         const result = await instance.fibonacci();
    //         //Assert
    //     })
    //
    //     it("Fibonacci of 6", async () => {
    //         //Arrange
    //         //Act
    //         const result = await instance.fibonacci();
    //         //Assert
    //     })
    //
    //     it("Fibonacci of 7", async () => {
    //         //Arrange
    //         //Act
    //         const result = await instance.fibonacci();
    //         //Assert
    //     })
    //
    //     it("Fibonacci of 8", async () => {
    //         //Arrange
    //         //Act
    //         const result = await instance.fibonacci();
    //         //Assert
    //     })
    //
    //     it("Fibonacci of 9", async () => {
    //         //Arrange
    //         //Act
    //         const result = await instance.fibonacci();
    //         //Assert
    //     })
    //
    //     it("Fibonacci of 10", async () => {
    //         //Arrange
    //         //Act
    //         const result = await instance.fibonacci();
    //         //Assert
    //     })
    // })

    describe("Child Locator", async () => {
        function nestedObjectCreator(depth) {
            const result = {
                "id": "root",
                "value": 42,
                "description": "Root Object",
                "children": []
            };

            populateChildren(depth, result);

            return result;
        }

        function populateChildren(depth, result) {
            for (let i = 0; i < depth; i++) {

            }
            if (depth === 0) return;

            //grab a random number between 1 and 3
            const numberOfChildren = Math.floor(Math.random() * 3) + 1;
            const children = [];

            //iterate that many times
            for (let j = 0; j < numberOfChildren; j++) {
                //create a new object with a random key, value, description
                const childObj = {
                    "id": Math.floor(Math.random() * 100),
                    "value": Math.floor(Math.random() * 100),
                    "description": "Some Object"
                }
                children.push(childObj);
            }

            result.children = children;

            //grab another random number between 0 and length of children
            const randomChild = Math.floor(Math.random() * result.children.length);
            populateChildren(depth - 1, result.children[randomChild]);
        }

        const obj = {
            "id": "root",
            "value": 42,
            "description": "Root Object",
            "children": [
                {
                    "id": "child1",
                    "value": 17,
                    "description": "First Child",
                    "elements": [
                        {
                            "id": "element1",
                            "value": 10,
                            "description": "First Element"
                        },
                        {
                            "id": "element2",
                            "value": 23,
                            "description": "Second Element"
                        }
                    ]
                },
                {
                    "id": "child2",
                    "value": 56,
                    "description": "Second Child",
                    "elements": [
                        {
                            "id": "subelement1",
                            "value": 30,
                            "description": "Subelement One"
                        },
                        {
                            "id": "subelement2",
                            "value": 22,
                            "description": "Subelement Two"
                        }
                    ]
                }
            ]
        }

        it("locate a child with matching key-value pairing", async () => {
            //Arrange
            const dataset = nestedObjectCreator(5);
            //Act
            const result = await instance.locateChild(obj, "id", "child1");

            //Assert
            assertEquals(result, obj.children[0]);
        })

        it("locates the root child as the matching item", async () => {
            //Arrange
            //Act
            const result = await instance.locateChild(obj, "id", "root");

            //Assert
            assertEquals(result, obj);
        })

        it("no matching child based on key", async () => {
            //Arrange
            //Act
            const result = await instance.locateChild(obj, "someRandomKey", "root");

            //Assert
            assertEquals(result, null);
        })

        it("no matching child based on value", async () => {
            //Arrange
            //Act
            const result = await instance.locateChild(obj, "id", "someRandomValue");

            //Assert
            assertEquals(result, null);
        })

        it("no matching child based on key and value", async () => {
            //Arrange
            //Act
            const result = await instance.locateChild(obj, "someRandomKey", "someRandomValue");

            //Assert
            assertEquals(result, null);
        })

        //NOTE: Will need to update this test cases when we add support for multiple children are returned
        it("all matching children match based on key and value", async () => {
            //Arrange
            const allMatchArray = [
                {
                    "id": 1,
                    "value": 42,
                    "description": "Some Object"
                },
                {
                    "id": 2,
                    "value": 42,
                    "description": "Some Other Object"
                },
                {
                    "id": 3,
                    "value": 42,
                    "description": "Some Other Other Object",
                    "children": [
                        {
                            "id": 4,
                            "value": 42,
                            "description": "Some Other Other Other Object"
                        },
                        {
                            "id": 5,
                            "value": 42,
                            "description": "Some Other Other Other Object",
                            "children": [
                                {
                                    "id": 6,
                                    "value": 42,
                                    "description": "Some Other Other Other Other Object"
                                },
                                {
                                    "id": 7,
                                    "value": 42,
                                    "description": "Some Other Other Other Other Object"
                                }
                            ]
                        }
                    ]
                }
            ]

            //Act
            const result = await instance.locateChild(allMatchArray, "value", 42);

            //Assert
            assertEquals(result, allMatchArray[0]);
        })
    })
});