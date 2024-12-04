exports.handler = async () => {
    const branches = [
          {
            "branchID": "1",
            "branch_Name": "Branch_1",
            "location": "Location_1",
            "status": "active",
            "id": "d4d5"
          },
          {
            "branchID": 2,
            "branch_Name": "Branch_2",
            "location": "Location_2",
            "status": "active",
            "id": "3e1b"
          },
          {
            "branchID": 3,
            "branch_Name": "Branch_3",
            "location": "Location_3",
            "status": "in-active",
            "id": "85d5"
          },
          {
            "id": "3515",
            "branchID": 4,
            "status": "active",
            "branch_Name": "Branch_4",
            "location": "Location_4"
          }
        ]
      
    return {
      statusCode: 200,
      body: JSON.stringify(branches),
    };
  };
  