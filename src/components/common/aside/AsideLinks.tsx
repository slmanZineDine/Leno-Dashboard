// My-Components
import AsideMainLink from "@components/common/aside/AsideMainLink";
import AsideSubLinks from "@components/common/aside/AsideSubLinks";
// My-Hooks
import useAsideLinks from "@hooks/links/useAsideLinks";

const AsideLinks = ({ onLinkClick }: any) => {
  // ################### CUSTOM HOOKS ###################
  const links = useAsideLinks();

  return (
    <ul className="text-text overflow-y-auto pb-8">
      {links.map(
        (link) =>
          link.isShow && (
            <li key={link.id}>
              {link?.children ? (
                <AsideSubLinks
                  mainLink={link}
                  links={link?.children}
                  onLinkClick={onLinkClick}
                />
              ) : (
                <AsideMainLink
                  link={link.link}
                  icon={link.icon}
                  title={link.title}
                  onLinkClick={() => {
                    if (document.body.clientWidth < 992) onLinkClick(false);
                  }}
                />
              )}
            </li>
          ),
      )}
    </ul>
  );
};

export default AsideLinks;
