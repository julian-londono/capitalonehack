import json, random
with open('categories.json') as json_data:
    data = json.load (json_data)

#Used to extract category data
# itemList = {}
# for item in data["categories"]:
#     totalInCategory = len(item["hierarchy"])
#     if (totalInCategory > 1):
#         itemList[item["hierarchy"][totalInCategory-1]] = item["hierarchy"][0]

# with open('categories.json', 'w') as outfile:
#     json.dump(itemList, outfile)

#Returns only Services
# for key in data.keys():
#     if(data.get(key) == "Service"):
#         print (key)

with open('userdata.json') as json_data:
    userdata = json.load (json_data)
purchasesJson = {"purchases": []}
for x in range(2):
    randomPurchase = random.choice(data.keys())
    purchasesJson["purchases"].append({"amount": 10,
                    "type": randomPurchase})
# print(purchasesJson)
print(userdata["Users"][0])
    # print(random.choice(itemList.keys())+ ": $" + str(random.randint(1,101)))
