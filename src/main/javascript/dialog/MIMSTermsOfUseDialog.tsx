import {autobind} from 'core-decorators';
import AcceptCancelDialog from 'main/dialog/AcceptCancelDialog';
import StoreProps from 'main/store/StoreProps';
import {inject} from 'mobx-react';
import React from 'react';

/**
 * Display MIMS Licence Agreement text for user to agree on. When accept button is clicked this dialog will set MIMS
 * licence agreement to true.
 *
 * @author Thompson 10/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
@inject('handlers')
class MIMSTermsOfUseDialog extends React.Component<StoreProps>
{
    private static messagePanel(): React.ReactNode
    {
        return (
            <>
                <p style={{ textAlign: 'center', fontSize: '24.0pt' }}><b>MIMS</b></p>
                <p style={{ textAlign: 'center' }}><b>Integrated Database</b></p>
                <p style={{ textAlign: 'center' }}><b>Terms of Use</b></p>

                <p><b>BY INSTALLING, DOWNLOADING,
                    ACCESSING OR OTHERWISE USING THE DATABASE OR ANY UPDATE or new version OF THE
                    DATABASE, YOU AGREE TO BE BOUND BY These Terms of Use ("Terms"). IF YOU DO NOT
                    AGREE TO THEse TERMS DO NOT INSTALL, DOWNLOAD, or use THE DATABASE OR ANY
                    UPGRADE TO or new version OF THE DATABASE. ONCE You click ‘Accept’ (if this
                    option is available) or once You install, Access or Use THE DATABASE (Whichever
                    occurs earlier), you and ANY PERSON SUBSEQUENTLY Accessing OR USING THE
                    DATABASE WILL BE SUBJECT TO THEse TERMS. the Database may be protected under
                    the terms of a Licence Agreement between You/Your Organisation And MIMS, and in
                    such case, these Terms do not supersede or replace any of those terms.</b></p>

                <h1>1. LICENCE</h1>

                <p>1.1 MIMS grants to You and
                    You accept, a non-transferable and non-exclusive licence to use the Database,
                    subject to these Terms and the following conditions:</p>

                <p>(a) You may use the Database only at the specified location, if any, or on the licensed
                    telecommunication device;</p>

                <p>(b) use of the Database is restricted to You; and</p>

                <p>(c) You may not: (i) alter, merge, modify or adapt the Database in any way, including
                    but not limited to disassembling or decompiling; (ii) loan, rent, lease or
                    license the Database or any copy; (iii) transfer the Database, or any copy, in
                    whole or in part, in any way, including but not limited to disassembling or
                    decompiling, except as expressly provided for in this license, (collectively the "<b>MIMS
                        Licence</b>").</p>

                <h1> 2. TERM</h1>
                <p>2.1 Where the Company has
                    provided You or Your Organisation with a licence to use the Application or Your
                    Organisation has provided You with access to or use of the Application (in each
                    case, "<b>Application Licence</b>"), then this
                    MIMS Licence is subject to You being granted a valid and current Application Licence
                    to use the Application and will only continue whilst You have an Application
                    Licence.</p>

                <p>2.2 MIMS has the right to terminate Your MIMS Licence if
                    You fail to comply with any of these Terms or
                    if the Application Licence has been terminated for any reason. Upon any such
                    termination You must immediately, at Your cost: (i) cease using the Database;
                    (ii) deliver to MIMS, or at MIMS' option destroy, every tangible copy of the
                    Database and the End User Documentation in Your possession or control or of any
                    person to whom You have given a copy of the Database and the End User Documentation
                    to; (iii) erase, or destroy in another way, every tangible copy of the Database
                    and the End User Documentation in Your possession or control or of any person
                    to whom You have given a copy to; and (iv) certify by a letter signed by Your
                    director or other duly authorised officer that all such copies have been
                    delivered, erased or destroyed and that You have unconditionally ceased using
                    the Database and the End User Documentation.</p>

                <h1>3. UPDATES</h1>

                <p>3.1 MIMS will provide Updates to the Database to the Company or directly to You, as the
                    case may be. The Updates must be installed by You within 30 days of receipt.</p>

                <p>3.2 When a New Version of the Database is received the previous edition must be
                    destroyed and no longer used or relied upon by You.</p>

                <h1>4. LIMITED WARRANTY</h1>

                <p>4.1 MIMS warrants that:</p>

                <p>(a) the Database will substantially conform to the documentation
                    supplied with the Application.</p>

                <p>(b) except as otherwise specifically provided in these Terms and
                    except for any condition or warranty the exclusion of which could be void or
                    otherwise contravene the Trade Practices Act 1974 (Cth) or any other applicable
                    law (<b>Non Excludable Condition</b>) MIMS
                    makes no warranty or representation, either express or implied, with respect to
                    the Database or other goods or services it supplies, including without
                    limitation to the quality, performance, merchantability, or fitness for a
                    particular purpose.</p>

                <p>(c) except for any Non Excludable Condition, MIMS excludes all
                    liability for the breach of any warranty or condition of any kind in respect of
                    the Database or other goods or services it supplies.</p>

                <p>(d) where legislation implies into these Terms any Non
                    Excludable Condition, MIMS’ liability for any breach of such Non Excludable
                    Condition will be limited at MIMS’ sole discretion to one or more of the
                    following:</p>

                <p>(i) in the case of goods, any one or more of the following:</p>
                <p>(A) the replacement of the goods or the supply of equivalent goods;</p>
                <p>(B) the repair of the goods;</p>
                <p>(C) the payment of the cost of replacing the goods or of acquiring equivalent goods;</p>
                <p>(D) the payment of the cost of having the goods repaired; or</p>
                <p>(ii) in the case of services: </p>
                <p>(A) the supplying of the services again; or</p>
                <p>(B) the payment of the cost of having the services supplied again.</p>

                <h1>5.LIMITATION OF LIABILITY</h1>

                <p>5.1 To the fullest extent allowed under the Trade Practices Act 1974 (Cth) or
                    any other applicable law except for liability for any Non Excludable Condition:</p>

                <p>(a) in no
                    event will MIMS be liable for any indirect loss, consequential
                    loss, loss of profits, loss of revenue, loss of goodwill, exemplary damages,
                    punitive damages or special damages in connection with or arising out of use of the Database,
                    the accuracy of the data contained in the Database, any breach of these Terms
                    and any negligence in MIMS performing its obligations under these Terms; and</p>

                <p>(b) in no
                    event will MIMS’s liability to You for any claim or damage arising out of or in
                    connection with these Terms exceed the amount paid by You for the MIMS Licence.</p>

                <h1>6. INTELLECTUAL PROPERTY</h1>

                <p>6.1 All Intellectual Property Rights and other proprietary rights in or
                    related to the Database and the End User Documentation are and will remain MIMS’s
                    exclusive property, whether or not specifically recognised or perfected under
                    local applicable law and You must not take any action that jeopardises MIMS’s
                    proprietary rights.</p>

                <p>6.2 Subject to these Terms no licence, right or interest in any MIMS trade marks,
                    service marks or trade names is granted to You under these Terms. If an action
                    is brought against You claiming that the Database or the End User Documentation
                    infringes the Intellectual Property Rights of a
                    third party, MIMS will, at its expense, defend or, at its option, settle the
                    action and, subject to this clause 6, indemnify You against any loss, cost or expense
                    (including reasonable legal fees and expenses), demand or liability, whether
                    direct or indirect, arising out of any such claim, but only if:</p>

                <p>(a) You notify MIMS promptly of any infringement, suspected infringement or alleged infringement;</p>

                <p>(b) MIMS has sole control over the defence of the claim and any negotiation for its
                    settlement or compromise;</p>

                <p>(c) You make no admission of liability, do not incur any legal expenses in connection
                    with the claim except as would be reasonable in the circumstances, or agree to
                    any compromise or settlement without MIMS prior written consent, and take no
                    other action that is contrary to MIMS interests; and</p>

                <p>(d) You provide MIMS with all available information and assistance as MIMS may
                    reasonably require in respect of any proceedings.</p>

                <p>6.3 If a claim described above has been asserted, MIMS will, at MIMS’s sole
                    option and expense:</p>

                <p>(a) procure the right for You to continue using the Database; or</p>

                <p>(b) replace or modify the Database to eliminate the infringement while providing
                    functionally equivalent performance; or</p>

                <p>6.4 MIMS will have no obligation to defend and indemnify You in respect of
                    any claims that the Database infringes the Intellectual Property Rights of a
                    third party, to the extent that a claim results from:</p>

                <p>(a) a correction to or modification of the Database not provided by MIMS;</p>

                <p>(b) use of the Database other than in accordance with the relevant documents or these
                    Terms;</p>

                <p>(c) use of an out of date edition of the Database; or</p>

                <p>(d) use of the Database in conjunction with other products that are not owned by MIMS
                    (other than as contemplated by these Terms).</p>

                <p>6.5 to the full extent permitted by the Trade Practices Act 1974 (Cth) or
                    any other applicable law, the remedies contained in this section constitute
                    Your sole and exclusive remedies and MIMS’s entire liability under these Terms
                    with respect to infringement of third party Intellectual Property Rights.</p>

                <h1>7. INDEMNITY FROM YOU</h1>

                <p>7.1 You agree to indemnify, defend and hold MIMS harmless against any claims, liabilities,
                    proceedings, costs, losses, expenses or damages incurred by MIMS in connection with
                    Your use of the Database (including, without limitation, any use by You of an out of date edition
                    of the Database or use of the Database outside the Territory), breach of these Terms or any other
                    negligent or wrongful act or omission by You.</p>

                <h1>8. DATABASE</h1>
                <p>8.1 No person should act in reliance on any statement contained in the information provided, and
                    at all times should remember that clinical decisions are the responsibility of the attending Health
                    Care Professional and where any doubt exists regarding the selection or appropriateness of any
                    therapy
                    or any information contained in the Database, referral to a relevant specialist and/or the specific
                    pharmaceutical manufacturer must be made.</p>
                <p>8.2 The selection of a therapy based on the information contained in the Database, and any intended
                    results is Your responsibility and to the fullest extent permitted by law MIMS accept no liability
                    whatsoever for the clinical decisions taken by You. Use of the Database does not replace the
                    professional
                    judgement of the Health Care Professional. Liability for clinical decisions is the sole
                    responsibility
                    of the Health Care Professional in charge of the treatment. The Database must only be used on
                    condition
                    that You ensure that You and any Health Care Professional using information in the Database verify
                    any
                    information contained in the Database to the information contained in the corresponding
                    pharmaceutical products specifications.</p>
                <p>8.3 You acknowledge and agree that the Database includes information which is subject to specific
                    health legislation and regulations in the Territory. MIMS has taken reasonable measures to ensure
                    that
                    the information contained in the Database complies with the Territory’s health regulations and codes
                    of practice.</p>
                <p>8.4 You acknowledge and agree that the information referred to in the Database is specific to the
                    Territory and may not be available or permitted in any other jurisdiction other than the
                    Territory. </p>
                <p>8.5 The Database provides You with: </p>
                <p>(a) information on the most commonly prescribed medicines in the Territory, such information having
                    been produced by MIMS’ review of prescribing information and product packaging that has been
                    approved
                    by the Regulatory Authority (where appropriate); </p>
                <p>(b) abridged information having been produced by the review of published primary and secondary
                    medicine literature; and </p>
                <p>(c) abridged information on medicines available in the Territory, such information having been
                    produced by the review of third party data sources, including the approved medicine datasheet.</p>
                <p>8.6 In each case, any omissions are due to the necessary information not being available to MIMS
                    at the time of publication. Although every reasonable effort has been made in compiling and checking
                    the information in the Database to ensure that it is accurate. MIMS makes no representation or
                    warranty that all content or information is complete, up to date or appropriate and assumes no
                    legal liability or responsibility for the accuracy, currency or completeness of any information in
                    the Database.</p>
                <p>8.7 The Database includes information provided by third parties. This information is identified
                    with the name of the source and has been chosen for publication because MIMS believe it to be
                    reliable.
                    The Database may also contain links to internet sites maintained by third parties over which MIMS
                    has no control, nor does MIMS have full knowledge of the content of such sites. To the extent
                    permitted by law, MIMS, its employees and agents accept no liability (including negligence)
                    for any injury, loss or damage caused by the reliance on any part of this third party
                    information.</p>

                <h1>9. COPYRIGHT</h1>
                <p>9.1 Copyright in the Database and the End User Documentation and each page of MIMS’ website is owned
                    by MIMS.
                    MIMS also owns the copyright in the content published on its website and the Database except where
                    otherwise
                    indicated by a third party's proprietary notice. Images, trade marks and brands are also protected
                    by other
                    intellectual property laws and may not be reproduced or appropriated in any manner without written
                    permission
                    of their respective owners. Unless specifically prohibited by a notice published on any page, You
                    may make a
                    print copy of such parts of the website as You may reasonably require for Your own personal use
                    provided that
                    any copy has attached to it any relevant proprietary notices and/or disclaimers. Subject to any
                    statutory exceptions
                    under the Copyright Act 1968 (Cth) all other use of the website and the content published on the
                    website is strictly prohibited.</p>
                <p>9.2 MIMS does not warrant that the functions contained on its website and/or in the Database will
                    meet Your
                    requirements or that the access, use or operation of the Database will be uninterrupted or error
                    free.
                    To the extent permitted by law, the warranties and remedies set forth in these Terms are exclusive
                    and
                    in lieu of all others, oral or written, expressed or implied.</p>

                <h1>10. GENERAL</h1>
                <p>10.1 You may not assign or transfer these Terms.</p>
                <p>10.2 You agree to comply with all applicable laws. You undertake to ensure that You and each and
                    every person subsequently accessing or using the Database reads and understands the provisions of
                    these
                    Terms prior to using the Database and complies with the provisions of these Terms. You hereby
                    acknowledge
                    and agree that You will be liable to MIMS for any breach of the provisions of these Terms by any
                    such user.</p>
                <p>10.3 Notwithstanding that any provision of these Terms may prove to be invalid or unenforceable, it
                    is to
                    be read down or severed to the extent of the invalidity or unenforceability and it does not affect
                    the validity
                    of the remaining provisions of these Terms which shall continue in full force and effect.</p>
                <p>10.4 A person or entity who is not a party to these Terms shall have no right to enforce any term of
                    these Terms.</p>
                <p>10.5 You acknowledge that You have read these Terms and understood and agree to be bound by its terms
                    and conditions.
                    You further agree that these Terms constitute the complete and exclusive statement of the agreement
                    between
                    You and MIMS, which supersedes any proposal or prior deed, oral or written, and any other
                    communication
                    between You and MIMS relating to the subject matter of these Terms. In the event of any
                    inconsistency
                    between the provisions of these Terms and any other agreement between You and MIMS, the provisions
                    of
                    these Terms will prevail, provided that if the Database is protected under the terms of a licence
                    agreement between You/Your Organisation and MIMS, then in such case, these Terms do not supersede
                    or replace any of those terms.</p>
                <p>10.6 These Terms are governed by the laws of New South Wales, Australia. You agree to submit to the
                    non-exclusive jurisdiction of the courts of New South Wales.</p>

                <h1>11. DICTIONARY</h1>
                <dl>
                    <dt>"Application"</dt>
                    <dd>means the product provided by the Company to You which incorporates the Database.</dd>
                    <dt>"Company"</dt>
                    <dd>means the company or entity that has created the Application.</dd>
                    <dt>"Database"</dt>
                    <dd>means MIMS software and the Database as licenced to You.</dd>
                    <dt>"End User Documentation"</dt>
                    <dd>means the manuals produced and provided by MIMS to allow the proper use of the Database by
                        You.
                    </dd>
                    <dt>"Health Care Professional"</dt>
                    <dd>means a professionally trained person who has the requirements set down by the relevant
                        authorities for practising as a health care practitioner in the Territory.
                    </dd>
                    <dt>"Intellectual Property Rights"</dt>
                    <dd>means all rights, whether registered or unregistered in any patent, trade mark, trade name,
                        business name, company name, copyright, registered design or other design right or circuit
                        layout right, know-how, confidential information or proprietary information or any similar
                        rights of intellectual property, and any applications for, or rights to obtain or acquire, any
                        such rights.
                    </dd>
                    <dt>"MIMS"</dt>
                    <dd>means UBM Limited (ABN 68 050 695 157) of 3rd Floor, 1 Chandos Street, St Leonards NSW 2065
                        Australia.
                    </dd>
                    <dt>"New Version"</dt>
                    <dd>means any substantial change to the data, code or function of the Database that does not equate
                        to a change in the core function of the Database or information provided in the Database as made
                        available from time to time in accordance with these Terms.
                    </dd>
                    <dt>"Regulatory Authority"</dt>
                    <dd>means the Therapeutic Goods Administration of Australia or any other applicable authority having
                        jurisdiction in the Territory.
                    </dd>
                    <dt>"Territory"</dt>
                    <dd>means Australia.</dd>
                    <dt>"Updates"</dt>
                    <dd>means updated information for the Database, which will be supplied to You during the Term in
                        accordance with clause 3.
                    </dd>
                    <dt>"You", "Your"</dt>
                    <dd>means the individual who uses or accesses the Database.</dd>
                    <dt>"Your Organisation"</dt>
                    <dd>means the entity for which You act as an employee, officer, director, agent, partner or
                        consultant.
                    </dd>
                </dl>
            </>
        );
    }

    @autobind
    private async onAccept()
    {
        const licenceAccepted = await this.props.handlers.medicationHandler.acceptMIMSLicence();
        return licenceAccepted;
    }

    public render()
    {
        return <AcceptCancelDialog header="Licence" maxWidth="70em" message={MIMSTermsOfUseDialog.messagePanel()}
            onAccept={this.onAccept} />;
    }
}

export default MIMSTermsOfUseDialog;
