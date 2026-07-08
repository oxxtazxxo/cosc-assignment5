export function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.path}`);
    next();
}