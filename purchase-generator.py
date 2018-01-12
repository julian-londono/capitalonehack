import json, random, numpy as np
with open('sortedcategorydata.json') as json_data:
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
weights = [0.15,0.23,0.28,0.04,0.04,0.06,0.2]

purchasesJson = []
choice_list = np.random.choice(data.keys(), 100, replace=True, p=weights)
# print(choice_list)
for item in choice_list:
    randomPurchase = random.choice(data[item])
    purchasesJson.append({"amount": random.randint(1,101),
                        "category": item,
                        "type": randomPurchase})
# print(purchasesJson)
# print(userdata)
userdata["Users"][2]["purchases"] = purchasesJson
with open('userdata.json', 'w') as outfile:
    json.dump(userdata, outfile)
