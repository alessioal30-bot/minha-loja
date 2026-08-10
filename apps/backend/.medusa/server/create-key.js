"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const utils_1 = require("@medusajs/framework/utils");
async function default_1({ container }) {
    const apiKeyService = container.resolve(utils_1.Modules.API_KEY);
    const key = await apiKeyService.createApiKeys({
        title: "Storefront Key",
        type: "publishable",
        created_by: "system",
    });
    console.log("CHAVE_PUBLICADA:", key.token);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWtleS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2NyZWF0ZS1rZXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSw0QkFVQztBQVpELHFEQUFtRDtBQUVwQyxLQUFLLG9CQUFVLEVBQUUsU0FBUyxFQUFrQztJQUN6RSxNQUFNLGFBQWEsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGVBQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUV4RCxNQUFNLEdBQUcsR0FBRyxNQUFNLGFBQWEsQ0FBQyxhQUFhLENBQUM7UUFDNUMsS0FBSyxFQUFFLGdCQUFnQjtRQUN2QixJQUFJLEVBQUUsYUFBYTtRQUNuQixVQUFVLEVBQUUsUUFBUTtLQUNyQixDQUFDLENBQUE7SUFFRixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUM1QyxDQUFDIn0=