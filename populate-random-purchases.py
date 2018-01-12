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
    userdata = json.load(json_data)
purchasesJson = []
for x in range(100):
    randomPurchase = random.choice(data.keys())
    purchasesJson.append({"amount": random.randint(1,101),
                    "category": data.get(randomPurchase),
                    "type": randomPurchase})
# print(purchasesJson)
# print(userdata)
userdata["Users"][2]["purchases"] = purchasesJson
with open('userdata.json', 'w') as outfile:
    json.dump(userdata, outfile)
