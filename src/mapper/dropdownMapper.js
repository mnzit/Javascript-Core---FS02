export function mapRolesAsDropdown(fetchRoles) {
    return () => fetchRoles().then(response => {
        let rolesData = [];
        response?.data?.roles?.forEach((role) => {
            rolesData.push({
                key: role.id,
                value: role.name
            })
        })
        return rolesData;
    })
}